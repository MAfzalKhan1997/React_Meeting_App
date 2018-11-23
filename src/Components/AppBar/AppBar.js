import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import AuthState from '../../Helper/AuthState'
import firebase from '../../Config/firebase'
import GetDirection from '../GetDirection/GetDirection';
import './AppBar.css'

import moment from "moment";
import 'typeface-roboto';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
// import MailIcon from '@material-ui/icons/MailOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import StarIcon from '@material-ui/icons/StarBorderOutlined';
import SendIcon from '@material-ui/icons/SendOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';


import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import green from '@material-ui/core/colors/green';

import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import FaceIcon from '@material-ui/icons/FaceOutlined';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        textAlign: 'left',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

    list: {
        width: 250,
    },

    paper: {
        position: 'absolute',
        maxWidth: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        borderRadius: '5px'
    },

    // avatar: {
    //     // margin: 10,
    //     width: 50,
    //     height: 50,
    // },
    bigAvatar: {
        boxShadow: '0px 0px 0px 12px rgba(42, 196, 127, 0.9), 0px 0px 0px 28px rgba(42, 196, 127, 0.2)',
        margin: '10px -10px',
        width: 100,
        height: 100,
    },

    nickName: {
        color: 'rgb(42, 196, 127)',
        marginTop: '25px',
        fontSize: '18px'
    },
    locBtn: {
        color: green[400],
    },
    button: {
        margin: '5px 0px 5px 0px',
    },
    appBar: {
        position: 'relative',
    },
    
    avatar: {
        width: 60,
        height: 60,
        top: 60,
        left: 10
      },
      drawerText: {
        paddingLeft: '10px',
        // backgroundColor: '#e0f2f111',
        color: "white"
      }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class MyAppBar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            myProps: props,
            userAvail: null,
            auth: true,
            anchorEl: null,

            sidePanel: false,
            openModal: false,

            notificationObj: {
                avatarURL1: [],
                avatarURL2: [],
                selectedLoc: { name: '' },
                duration: []
            },

            openMap: false,
        };

        this.showNotification = this.showNotification.bind(this)
    }

    static getDerivedStateFromProps() {
        AuthState()

        const userAvail = JSON.parse(localStorage.getItem("user"));
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        return {
            userAvail,
            userProfile,
        }
    }

    showNotification() {
        firebase.messaging().onMessage(payload => {
            for (const key in payload.data) {
                console.log("object", JSON.parse(payload.data[key]));
                this.setState({ notificationObj: JSON.parse(payload.data[key]) })
            }
            this.setState({ openModal: true })
        })
    }

    setMeeting(meeting, status) {

        // const { meetingsKey } = this.state;
        this.setState({ openModal: false });

        const meetingObj = {

            displayName1: meeting.displayName1,
            nickName1: meeting.nickName1,
            avatarURL1: meeting.avatarURL1,
            contact1: meeting.contact1,
            email1: meeting.email1,
            uid1: meeting.uid1,
            postStatus1: meeting.postStatus1,

            displayName2: meeting.displayName2,
            nickName2: meeting.nickName2,
            avatarURL2: meeting.avatarURL2,
            contact2: meeting.contact2,
            email2: meeting.email2,
            uid2: meeting.uid2,
            postStatus2: meeting.postStatus2,

            status: status,
            selectedDate: meeting.selectedDate,
            selectedLoc: meeting.selectedLoc,
            duration: meeting.duration,
            key: meeting.key,
        }

        console.log(meetingObj)

        var updates = {};
        updates[`/meetingsArea/${meeting.uid1}/meetingsSec/${meeting.uid2}/meetings/` + meeting.key] = meetingObj;
        updates[`/meetingsArea/${meeting.uid2}/requestsSec/` + meeting.key] = meetingObj;

        return firebase.database().ref().update(updates)
            .then(resp => {
                console.log(status, resp)
            })


    }

    showMap(obj) {
        let lat = obj.location.lat;
        let lng = obj.location.lng;

        this.setState({
            openMap: true,
            // locName: obj.name,
            destination: {
                latitude: lat,
                longitude: lng,
            }
        })

    }

    toMyProfile() {
        // const { userProfile } = this.state;

        this.props.history.push('/my_profile')
    }

    //   handleChange = event => {
    //     this.setState({ auth: event.target.checked });
    //   };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    toggleDrawer = (open) => () => {
        this.setState({
            sidePanel: open,
        });
    };

    modalClose = () => {
        this.setState({ openModal: false });
    };

    handleMap() {
        this.setState({ openMap: false });
    };


    componentDidMount() {
        this.showNotification()
    }

    render() {
        const { classes } = this.props;
        const { anchorEl, userAvail, myProps, notificationObj, destination, userProfile } = this.state;
        const open = Boolean(anchorEl);

        const icons1 = [<DashboardIcon />, <FaceIcon />];
        const func1 = [
            () => this.props.history.push('/dashboard'),
            () => this.props.history.push('/my_profile')
        ];
        const icons2 = [<InboxIcon />, <StarIcon />, <SendIcon />];
        const icons3 = [<DeleteIcon />, <ErrorIcon />];

        const sideList = (
            <div className={classes.list}>
            <div style={{ width: "100%", height: "200px", backgroundImage: `url(${require("../../Images/back.jpg")})`,  backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
          <span>
            <Avatar src={userAvail.photoURL} className={classes.avatar} alt="Profile Picture" />
            <br />
            <br />
            <br />
            <Typography className={classes.drawerText} variant='overline'>{userAvail.displayName}</Typography>
            <Typography className={classes.drawerText} variant='body2'>{userAvail.email}</Typography>
          </span>
        </div>
                <List>
                    {['Dashboard', 'Profile'].map((text, index) => (
                        <ListItem button onClick={func1[index]} key={text}>
                            <ListItemIcon>{icons1[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{icons2[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{icons3[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        let meetingTime = notificationObj.selectedDate
        // console.log(value.nickName1, meetingTime)
        let nowTime = new Date()
        // console.log(nowTime)
        let timeDiff = moment(nowTime).diff(meetingTime);
        console.log('request', timeDiff)

        // if(timeDiff > 0 && value.status === 'PENDING' ){
        // this.setMeeting(value, index, 'CANCELLED')
        // }

        return (
            <div className={classes.root}>

                {userAvail ?
                    <SwipeableDrawer
                        open={this.state.sidePanel}
                        onClose={this.toggleDrawer(false)}
                        onOpen={this.toggleDrawer(true)}
                    >
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer(false)}
                            onKeyDown={this.toggleDrawer(false)}
                        >
                            {sideList}
                        </div>
                    </SwipeableDrawer>
                    :
                    null
                }

                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            MeeTup
                        </Typography>

                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                {
                                    userAvail ?
                                        <div onClick={this.handleClose} style={{ outline: 'none' }}>
                                            {userProfile &&
                                                <MenuItem onClick={() => this.toMyProfile()}>Profile</MenuItem>
                                            }
                                            <MenuItem><SignOut {...myProps}></SignOut></MenuItem>
                                            {/* {console.log('meri', myProps)} */}
                                        </div>
                                        :
                                        <MenuItem onClick={this.handleClose}><SignIn {...myProps}></SignIn></MenuItem>
                                }
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>

                {userProfile && timeDiff < 0 &&
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openModal}
                        onClose={this.modalClose}
                    >
                        <center>
                            <div className={classes.paper}>
                                <br />
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Avatar
                                        alt={notificationObj.nickName2}
                                        src={notificationObj.avatarURL2[0]}
                                        className={classes.bigAvatar}
                                    />
                                    <Avatar
                                        alt={notificationObj.nickName1}
                                        src={notificationObj.avatarURL1[0]}
                                        className={classes.bigAvatar}
                                    />
                                </div>

                                <Typography variant="body2" id="modal-title" className={classes.nickName} >
                                    {/* Ajji */}
                                    {notificationObj.nickName1}
                                </Typography>
                                <br />
                                <Typography variant="caption" id="modal-title">
                                    {/* Regent Plaza */}
                                    {notificationObj.selectedLoc.name}
                                </Typography>
                                <Typography variant="caption" id="modal-title">
                                    {/* Thursday, Nov 12, 2018, 4:05 A.M */}
                                    {notificationObj.selectedDate}
                                </Typography>
                                <Typography variant="body2" id="modal-title" style={{ color: 'rgb(42, 196, 127)', marginTop: '5px' }}>
                                    {/* 40 minutes */}
                                    {notificationObj.duration[0]} minutes
                            </Typography>
                                <br />
                                <Button variant="contained" color="primary" autoFocus fullWidth onClick={() => this.setMeeting(notificationObj, 'ACCEPTED')} className={classes.button}>
                                    Confirm
                            </Button>
                                <br />
                                <Button variant="outlined" onClick={() => this.showMap(notificationObj.selectedLoc)} fullWidth className={classNames(classes.locBtn, classes.button)}>
                                    Show location
                            </Button>
                                <br />
                                <Button variant="contained" fullWidth onClick={this.modalClose} color="secondary" className={classes.button}>
                                    Close
                            </Button>

                            </div>
                        </center>
                    </Modal>
                }
                {userProfile &&
                    <Dialog
                        fullScreen
                        open={this.state.openMap}
                        onClose={() => this.handleMap()}
                        TransitionComponent={Transition}
                    >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton style={{ marginLeft: '-15px' }} color="inherit" onClick={() => this.handleMap()} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" style={{ flex: '1' }}>
                                    {notificationObj.selectedLoc.name}
                                </Typography>
                                <Button size="small" color="inherit" onClick={() => this.refs.getDirection.getDirections()}>
                                    Get Directions
                            </Button>
                            </Toolbar>
                        </AppBar>

                        <GetDirection ref="getDirection" coords={userProfile.coords} destination={destination} />
                    </Dialog>
                }
            </div>
        );
    }
}

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAppBar);