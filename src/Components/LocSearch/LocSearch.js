import React, { Component } from 'react';
import './LocSearch.css';
import firebase from '../../Config/firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    // root: {
    //   width: '100%',
    //   maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper,
    // backgroundColor: 'yellow',
    // },
});


class LocSearch extends Component {

    constructor() {
        super()

        this.state = {
            searchLocations: [],
            nearLocations: [],
            search: null,
        }
    }

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


    render() {
        // const { classes } = this.props;
        const { searchLocations, nearLocations, search } = this.state;

        return (
            <center>
                <div className='locationsDiv' >

                    <TextField
                        //   placeholder="e.g:Attend Meeting"
                        label="Search here..."
                        helperText="Location"
                        //   inputProps= {{maxLength:17}}
                        fullWidth={true}
                        margin={'normal'}
                        // required={true} "show * means required"
                        // error={true} "shows like there is error"
                        // multiline={true} "behaves like textarea"
                        onChange={(e) => this.searchLoc(e)}
                    //   value={this.state.text}
                    />


                    <List style={{ marginLeft: '-25px' }}>

                        {search && searchLocations.map((value, index) => {

                            return <div>
                                <ListItem>
                                    <LocationIcon />
                                    <ListItemText primary={value.name} secondary={value.location.address} />
                                </ListItem>

                                <Divider inset component="li" />
                            </div>
                        })}

                        {!search && nearLocations.map((value, index) => {

                            return <div>
                                <ListItem>
                                    <LocationIcon />
                                    <ListItemText primary={value.venue.name} secondary={value.venue.location.address} />
                                </ListItem>

                                <Divider inset component="li" />
                            </div>
                        })}

                    </List>

                </div>
            </center>
        );
    }
}

LocSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocSearch);