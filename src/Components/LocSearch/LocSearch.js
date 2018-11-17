import React, { Component } from 'react';
import './LocSearch.css';
import GetDirection from './GetDirection/GetDirection';
import firebase from '../../Config/firebase';
import $ from 'jquery'

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import DirectionIcon from '@material-ui/icons/DirectionsOutlined';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, InputAdornment } from '@material-ui/core';

const styles = theme => ({
    // root: {
    //   width: '100%',
    //   maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper,
    // backgroundColor: 'yellow',
    // },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    bigAvatar: {
        boxShadow: '0 0 40px rgb(155, 0, 72)',
        margin: -10,
        width: 90,
        height: 90,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class LocSearch extends Component {

    constructor() {
        super()

        this.state = {
            searchLocations: [],
            nearLocations: [],
            search: null,
            showMap: false,
            showReqDialog: false,

            selectedDate: new Date(),
            selectedLoc: '',

            myProfile: { avatarURL: [], },
            userProfile: { avatarURL: [], },
        }
    }

    handleMap() {
        this.setState({ showMap: false });
    };

    handleReqDialog() {
        this.setState({ showReqDialog: false, selectedDate: new Date(), });
    };


    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };


    setMeeting() {
        const { myProfile, userProfile, selectedDate, selectedLoc } = this.state;

        this.setState({ showReqDialog: false });

        let options = {  
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
 
        const userDetails = {
            displayName: userProfile.displayName,
            nickName: userProfile.nickName,
            avatarURL: userProfile.avatarURL,
            contact: userProfile.contact,
            email: userProfile.email,
            uid: userProfile.uid,

            status: 'PENDING',
            selectedDate: selectedDate.toLocaleString('en-us', options),
            selectedLoc,
        }

        
        const userObj = {
            displayName: userProfile.displayName,
            avatarURL: userProfile.avatarURL[0],
            contact: userProfile.contact,
            email: userProfile.email,
        }

        const myDetails = {
            displayName: myProfile.displayName,
            nickName: myProfile.nickName,
            avatarURL: myProfile.avatarURL,
            contact: myProfile.contact,
            email: myProfile.email,
            uid: myProfile.uid,

            status: 'PENDING',
            selectedDate: selectedDate.toLocaleString('en-us', options),
            selectedLoc,
        }
 

        firebase.database().ref(`meetingsArea/${myProfile.uid}/meetingsSec/${userProfile.uid}`).once('value', (data) => {

            console.log(data.val());
            let user = data.val();

            if (user === null) {
                firebase.database().ref("/").child(`meetingsArea/${myProfile.uid}/meetingsSec/${userProfile.uid}`).set(userObj)
                // firebase.database().ref("/").child(`meetingsArea/${userProfile.uid}/requestsSec/${myProfile.uid}`).set(myObj)
            }

            firebase.database().ref("/").child(`meetingsArea/${myProfile.uid}/meetingsSec/${userProfile.uid}/meetings`).push(userDetails)
                .then((resp) => {
                    const responseKey = resp.key;
                    console.log("Meeting Set.", resp);


                    firebase.database().ref("/").child(`meetingsArea/${userProfile.uid}/requestsSec/${responseKey}`).set(myDetails)
                        .then(() => {
                            
                            console.log("Req Sent.");
                            this.props.history.replace('/dashboard')
            
                            
                            firebase.database().ref("fcmTokens").once("value", function (snapshot) {
                                // console.log(snapshot);
                                snapshot.forEach(function (token) {
                                  if (token.val() === userProfile.uid) { //Getting the token of the reciever using  if condition..!   
                                    console.log(token.key)
                                    $.ajax({
                                      type: 'POST', url: "https://fcm.googleapis.com/fcm/send",
                                      headers: { Authorization: 'key=AIzaSyBnd7z7xBqkbxzSFaWu7wdlyR1NxFztGZo' },
                                      contentType: 'application/json',
                                      dataType: 'json',
                                      data: JSON.stringify({
                                        "to": token.key, "notification": {
                                          "title": `New Request From ${myProfile.displayName}`,
                                          "body": "You have a new meeting request",
                                          "icon": "https://firebasestorage.googleapis.com/v0/b/tinder-shinder-2.appspot.com/o/Notifications.png?alt=media&token=b4c86061-9644-4faa-a316-6461be0fe421", //Photo of sender
                                          "click_action": `https://meetup-mak.firebaseapp.com/dashboard`,
                                          "myObject": JSON.stringify(myDetails)
                                        }
                                      }),
                                      success: function (response) {
                                        console.log(response);
                                        //Functions to run when notification is succesfully sent to reciever
                                      },
                                      error: function (xhr, status, error) {
                                        //Functions To Run When There was an error While Sending Notification
                                        console.log(xhr.error);
                                      }
                                    });
                                  }
                                });
                              });
                            
                        })
                        .catch(function (error) {
                            console.log('Req Error:', error.message)
                        });
                })
                .catch(function (error) {
                    console.log('Meeting Error:', error.message)
                });
        })

    }

    componentWillMount() {

        const userAvail = JSON.parse(localStorage.getItem("user"));

        firebase.database().ref(`/profiles/${userAvail.uid}/`).once('value', (data) => {

            console.log('my Profiel', data.val());

            this.setState({ myProfile: data.val() }, () => this.getLoc())
        })
    }

    componentDidMount() {
        const { userProfile } = this.props.location.state;

        this.setState({
            openSnack: true,
            userProfile,
        })
    }


    async searchLoc(e) {
        // const { searchQuery } = this.state
        let search = e.target.value

        await this.setState({
            search,
        })

        // console.log(search)

        fetch(`https://api.foursquare.com/v2/venues/search?client_id=1MVO3SD3541GVNH2NO42OXQWNLN502CKOL3GEZR3CT1R3UAI&client_secret=GW511GOZVZYRQFQWW0H5SRKODAX1Y2MHYWVUUMCW004OVGFS&v=20180323&query=${search}&ll=24.883460,67.047375&radius=5000`)
            .then((res) => {
                // console.log("api", res.json())
                return res.json()
            }).then(result => {
                let { searchLocations } = this.state;
                searchLocations = result.response.venues
                console.log("search result", searchLocations)
                this.setState({
                    searchLocations
                })
            })
    }

    getLoc() {
        const { latitude, longitude } = this.state.myProfile.coords;
        // console.log("lat,long", latitude, longitude)

        fetch(`https://api.foursquare.com/v2/venues/explore?client_id=1MVO3SD3541GVNH2NO42OXQWNLN502CKOL3GEZR3CT1R3UAI&client_secret=GW511GOZVZYRQFQWW0H5SRKODAX1Y2MHYWVUUMCW004OVGFS&v=20180323&ll=${latitude},${longitude}&radius=5000&limit=5&sortByDistance=1`)
            .then((res) => {
                // console.log("api", res.json())
                return res.json()
            }).then(result => {
                let { nearLocations } = this.state;
                nearLocations = result.response.groups[0].items
                console.log("result", nearLocations)
                this.setState({
                    nearLocations
                })
            })
    }

    showMap(obj) {
        let lat = obj.location.lat;
        let lng = obj.location.lng;

        this.setState({
            showMap: true,
            locName: obj.name,
            destination: {
                latitude: lat,
                longitude: lng,
            }
        })
    }


    render() {

        const { classes } = this.props;
        const { destination, searchLocations, nearLocations, search, locName, myProfile, userProfile, selectedLoc } = this.state;
        const { coords } = this.state.myProfile;
        return (
            <center>
                <div className='locationsDiv' >

                    <TextField
                        //   placeholder="e.g:Attend Meeting"
                        //   value={this.state.text}
                        label="Search here..."
                        helperText="Location"
                        fullWidth={true}
                        margin={'normal'}
                        onChange={(e) => this.searchLoc(e)}
                    />

                    <Typography variant="body2" style={{ paddingTop: 10 }}>
                        Nearby Locations
                    </Typography>
                    <List style={{ marginLeft: '-25px' }}>


                        {search && searchLocations.map((value, index) => {

                            return <div key={index}>
                                <ListItem>
                                    <LocationIcon />
                                    <ListItemText primary={value.name} secondary={value.location.address} />

                                    <IconButton style={{ margin: '-10px' }} onClick={() => this.showMap(value)}>
                                        <DirectionIcon />
                                    </IconButton>

                                    <IconButton style={{ marginRight: '-25px' }} onClick={() => this.setState({ showReqDialog: true, selectedLoc: value })}>
                                        <CheckIcon />
                                    </IconButton>

                                </ListItem>

                                <Divider inset component="li" />
                            </div>
                        })}


                        {!search && nearLocations.map((value, index) => {

                            return <div key={index}>
                                <ListItem>
                                    <LocationIcon />
                                    <ListItemText primary={value.venue.name} secondary={value.venue.location.address} />

                                    <IconButton style={{ margin: '-10px' }} onClick={() => this.showMap(value.venue)}>
                                        <DirectionIcon />
                                    </IconButton>

                                    <IconButton style={{ marginRight: '-25px' }} onClick={() => this.setState({ showReqDialog: true, selectedLoc: value.venue })}>
                                        <CheckIcon />
                                    </IconButton>

                                </ListItem>

                                <Divider inset component="li" />
                            </div>
                        })}

                    </List>


                    <div>
                        <Dialog
                            fullScreen
                            open={this.state.showMap}
                            onClose={() => this.handleMap()}
                            TransitionComponent={Transition}
                        >
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton style={{ marginLeft: '-15px' }} color="inherit" onClick={() => this.handleMap()} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" color="inherit" className={classes.flex}>
                                        {locName}
                                    </Typography>
                                    <Button size="small" color="inherit" onClick={() => this.refs.getDirection.getDirections()}>
                                        Get Directions
                                    </Button>
                                </Toolbar>
                            </AppBar>

                            <GetDirection ref="getDirection" coords={coords} destination={destination} />
                        </Dialog>


                        <Dialog
                            open={this.state.showReqDialog}
                            onClose={() => this.handleReqDialog()}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        // fullWidth
                        // maxWidth={'sm'}
                        >
                            <DialogTitle id="alert-dialog-title">{`Hey ${myProfile.nickName},`}</DialogTitle>
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    alt={myProfile.displayName}
                                    src={myProfile.avatarURL[0]}
                                    className={classes.bigAvatar}
                                // className='bigAvatar'
                                />
                                <Avatar
                                    alt={userProfile.displayName}
                                    src={userProfile.avatarURL[0]}
                                    className={classes.bigAvatar}
                                // className='bigAvatar'
                                />
                            </div>
                            <br /><br />

                            <DialogContent>

                                {/* <DialogContentText> */}
                                {/* </DialogContentText> */}

                                <Typography variant="subtitle1" id="modal-title">
                                    Do you want to send Meeting Request to <b>{userProfile.nickName}</b> ?
                                </Typography>
                                <br />

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        animateYearScrolling={true}
                                        disablePast
                                        showTodayButton
                                        helperText="Meeting Date/Time"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <Icon>today</Icon>
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <br />

                                <TextField
                                    // disabled
                                    id="standard-disabled"
                                    // label="Disabled"
                                    helperText="Selected Location"
                                    value={selectedLoc.name}
                                    // className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <Icon>location_on</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </DialogContent>

                            <DialogActions>
                                <Button onClick={() => this.handleReqDialog()} color="primary" >
                                    Cancel
                                </Button>
                                <Button onClick={() => this.setMeeting()} autoFocus color='secondary' variant="contained">
                                    Send
                                </Button>
                            </DialogActions>
                            {/* </center> */}
                        </Dialog>

                        <Snackbar
                            open={this.state.openSnack}
                            onClose={() => this.setState({ openSnack: false })}
                            TransitionComponent={Fade}
                            autoHideDuration={4000}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Select a Location where you want to Meet</span>}
                        />

                    </div>

                </div>
            </center>
        );
    }
}


LocSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocSearch);