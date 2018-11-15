import React, { Component } from 'react';
import './LocSearch.css';
import GetDirection from './GetDirection/GetDirection';
import firebase from '../../Config/firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import DirectionIcon from '@material-ui/icons/DirectionsOutlined';
import CheckIcon from '@material-ui/icons/CheckOutlined';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
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
          
        }
    }

    handleClose(){
        this.setState({ showMap: false });
    };

    //   static getDerivedStateFromProps(props) {

    //     AuthState()
    //     const userAvail = JSON.parse(localStorage.getItem("user"));
    //     const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    //     // console.log('derived',userAvail,'derived',userProfile)

    //     return {
    //       userAvail,
    //       userProfile,
    //     }
    //   }
    componentWillMount() {

        const userAvail = JSON.parse(localStorage.getItem("user"));

        firebase.database().ref(`/profiles/${userAvail.uid}/`).once('value', (data) => {

            console.log('my Profiel', data.val());

            this.setState({ coords: data.val().coords }, () => this.getLoc())
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
        const { latitude, longitude } = this.state.coords
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
        const { coords, destination, searchLocations, nearLocations, search, locName } = this.state;

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

                                    <IconButton style={{ marginRight: '-25px' }}>
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

                                    <IconButton style={{ marginRight: '-25px' }}>
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
                            onClose={this.handleClose}
                            TransitionComponent={Transition}
                        >
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton style={{marginLeft: '-15px'}} color="inherit" onClick={() => this.handleClose()} aria-label="Close">
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