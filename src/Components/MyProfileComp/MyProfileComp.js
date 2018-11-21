import React, { Component } from 'react';
import './MyProfileComp.css';

import Profile from '../Profile/Profile';
// import AuthState from '../../Helper/AuthState'
import Carousel from 'nuka-carousel';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/FaceOutlined';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocalPhone from '@material-ui/icons/LocalPhoneOutlined';
import LocalBar from '@material-ui/icons/LocalBarOutlined';
import AccessTime from '@material-ui/icons/AccessTimeOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        // height: '300px'
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },

    paper: {
        maxWidth: '470px',
        minWidth: '200px',
    },

    progress: {
        marginTop: '110px',
        marginBottom: '110px',
    },
    appBar: {
        position: 'relative',
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}



class MyProfileComp extends Component {

    constructor() {
        super()

        this.state = {
            openEdit: false
        }
    }

    // componentWillMount() {
    static getDerivedStateFromProps() {
        const userAvail = JSON.parse(localStorage.getItem("user"));
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        // console.log('derived', userAvail, 'derived', userProfile)

        return {
            // this.setState({
            userAvail,
            userProfile,
            // })
        }
    }

    handleEdit(edit) {

        this.setState({
            openEdit: edit,
        })

    }


    render() {
        const { classes } = this.props;
        const { userAvail, userProfile } = this.state;
        // const { state } = this.props.location;
        console.log('userProfile', this.state.userProfile)
        // box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
        return (
            <center>
                <Grid xs={12} sm={11} md={8} lg={6}>
                    <div className="outerDiv">

                        <div className="carouselDiv" >
                            <Carousel
                                autoplay={true}
                                wrapAround={true}
                                autoplayInterval={2000}
                                pauseOnHover={true}
                                transitionMode='fade'
                            >

                                {userProfile.avatarURL.map((value, index) => (
                                    <img
                                        src={value}
                                        alt={value}
                                        key={value}
                                        className="images"
                                    />
                                ))}
                            </Carousel>
                        </div>

                        <div className="innerDiv">
                            <FormControl className={classes.margin}>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <PersonIcon color='secondary' />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid"
                                            value={userProfile.nickName}
                                            name='Nickname'
                                            label="Nickname"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <FormControl className={classes.margin}>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <LocalPhone color='secondary' />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid"
                                            // type='number'
                                            value={userProfile.contact}
                                            name='Contact'
                                            label="Contact"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                            </FormControl>
                            <br />
                            <FormControl className={classes.margin}>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <AccessTime color='secondary' />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid"
                                            // type='number'
                                            value={`${userProfile.mins} mins`}
                                            name='mins'
                                            label="Duration of Meeting"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                            </FormControl>
                            <FormControl className={classes.margin}>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <LocalBar color='secondary' />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid"
                                            // type='number'
                                            value={`${userProfile.beverages}`}
                                            name='bevs'
                                            label="Beverages"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                            </FormControl>

                            <Paper className={classes.paper} elevation={0}>
                                {
                                    userProfile.coords ? <MyMapComponent
                                        isMarkerShown
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `40vh` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        coords={userProfile.coords}
                                    // getCurrentPosition={this.getCurrPosition}
                                    />
                                        :
                                        <center>
                                            <CircularProgress className={classes.progress} />
                                        </center>
                                }
                            </Paper>

                        </div>

                        <Dialog
                            fullScreen
                            open={this.state.openEdit}
                            onClose={() => this.handleEdit(false)}
                            TransitionComponent={Transition}
                        >
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <Avatar
                                        alt={userProfile.nickName}
                                        src={userAvail.photoURL}
                                        style={{ marginRight: '10px' }}
                                    // className={classes.bigAvatar}
                                    />
                                    <Typography variant="subtitle1" color="inherit" style={{ flex: '1' }}>
                                        {userProfile.displayName}
                                    </Typography>

                                    <IconButton color="inherit" onClick={() => this.handleEdit(false)} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>

                                </Toolbar>
                            </AppBar>
                            <center>
                                <Profile text={'Edit Profile'} btnText={'Save Profile'} />
                            </center>
                        </Dialog>

                        <Button variant="fab" color="secondary" onClick={() => this.handleEdit(true)}
                            style={{
                                position: 'fixed',
                                bottom: '15px',
                                right: '15px',
                            }} >
                            <EditIcon />
                        </Button>

                    </div>
                </Grid>
            </center >
        );
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        // defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        //   draggable={true}
        //   onDragEnd={position => {
        //     // console.log(position.latLng.lat(), position.latLng.lng());
        //     props.getCurrentPosition({ latitude: position.latLng.lat(), longitude: position.latLng.lng() });
        //   }} 
        />}
    </GoogleMap>
))

MyProfileComp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyProfileComp);