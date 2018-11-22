import React, { Component } from 'react';
// import './Dashboard.css';

import firebase from '../../../Config/firebase';
import AddToCalendar from "react-add-to-calendar";
import 'react-add-to-calendar/dist/react-add-to-calendar.css'
import moment from "moment";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Avatar from '@material-ui/core/Avatar';

import Modal from '@material-ui/core/Modal';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
        // alignItems: 'left',
        textAlign: 'left',
    },
    column: {
        flexBasis: '70%',
        // alignItems: 'left',
        // textAlign: 'left',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        paddingLeft: `${theme.spacing.unit * 2}px`,
        marginRight: '-20px'
        // alignItems: 'right',
        // textAlign: 'left',
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        textTransform: 'capitalize',
        fontWeight: 'bolder',
        // '&:hover': {
        //     textDecoration: 'underline',
        // },
    },
    bigAvatar: {
        // boxShadow: '0 0 40px rgb(155, 0, 72)',
        marginRight: 20,
        width: 60,
        height: 60,
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

    popupAvatar: {
        boxShadow: '0px 0px 0px 12px rgba(42, 196, 127, 0.9), 0px 0px 0px 28px rgba(42, 196, 127, 0.2)',
        margin: '10px -10px',
        width: 100,
        height: 100,
    },
});


class DashMeetings extends Component {

    constructor() {
        super()

        this.state = {
            meeters: [],

            postPopup: true
        }
    }


    getData() {

        const { meeters } = this.state;
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        // this.setState({
        //     meeters:[]
        // })

        firebase.database().ref(`/meetingsArea/${userProfile.uid}/meetingsSec`).on('child_added', (data) => {

            meeters.push(data.val())
            // console.log('updated')
            this.setState({ meeters })

        })
    }

    componentWillMount() {
        this.getData()
    }

    setMeeting(meeting, status) {

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
                // this.getData()
            })
    }

    aboutMeeting(meeting, value) {

        const meetingObj = {

            displayName1: meeting.displayName1,
            nickName1: meeting.nickName1,
            avatarURL1: meeting.avatarURL1,
            contact1: meeting.contact1,
            email1: meeting.email1,
            uid1: meeting.uid1,
            postStatus1: value,

            displayName2: meeting.displayName2,
            nickName2: meeting.nickName2,
            avatarURL2: meeting.avatarURL2,
            contact2: meeting.contact2,
            email2: meeting.email2,
            uid2: meeting.uid2,
            postStatus2: meeting.postStatus2,

            status: meeting.status,
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
                console.log(value, resp)
                // this.getData()
                this.setState({
                    postPopup: false,
                })
            })
    }


    postPopupClose = () => {
        this.setState({ postPopup: false });
    };

    render() {

        // console.log(this.state.meeters)

        const { meeters } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {
                    meeters.length !== 0 ?
                        // 'meetings available'

                        <div className={classes.root}>

                            {meeters.map((value, index) => {
                                let meetings = []

                                let data = value.meetings
                                for (let key in data) {
                                    // console.log(data[key])
                                    meetings.push(data[key])
                                    // console.log(meetings)
                                }
                                return <ExpansionPanel key={index}>

                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div>
                                            <Avatar
                                                className={classes.bigAvatar}
                                                alt={value.displayName}
                                                src={value.avatarURL}
                                            />
                                        </div>
                                        <div style={{ textAlign: 'left', }}>
                                            <Typography variant="body2">{value.displayName}</Typography>
                                            <Typography variant="caption">{meetings[0].nickName2}</Typography>
                                            {/* <Typography variant="caption">4.5</Typography> */}
                                        </div>
                                    </ExpansionPanelSummary>

                                    {meetings.map((value, index) => {

                                        let event = {
                                            title: `Meet ${value.nickName2}`,
                                            description: `Have a meetup with ${value.displayName2} at ${value.selectedLoc.name}`,
                                            location: `${value.selectedLoc.name},${value.selectedLoc.location.address},${value.selectedLoc.location.city},${value.selectedLoc.location.country}`,
                                            startTime: `${moment(value.selectedDate).zone("-00:00").format('LLLL')}`,
                                            endTime: `${moment(value.selectedDate).add(value.duration[0], 'm').zone("-00:00").format('LLLL')}`
                                        };
                                        let icon = { textOnly: 'none' };
                                        let items = [
                                            { google: 'Google' },
                                            { apple: 'Apple' },
                                            // { yahoo: 'Yahoo!' },
                                        ];

                                        let meetingTime = value.selectedDate
                                        // console.log(value.nickName1, meetingTime)
                                        let nowTime = new Date()
                                        // console.log(nowTime)
                                        let timeDiff = moment(nowTime).diff(meetingTime);
                                        console.log('meeting', timeDiff)


                                        let status;

                                        if (value.postStatus1 !== 'null' && value.postStatus2 !== 'null') {
                                            if (value.postStatus1 === 'yes' && value.postStatus2 === 'yes') {
                                                status = 'SUCCESSFULL'
                                            }
                                            if (value.postStatus1 === 'no' && value.postStatus2 === 'no') {
                                                status = 'UNSUCCESSFULL'
                                            }
                                            if (value.postStatus1 !== value.postStatus2) {
                                                status = 'COMPLICATED'
                                            }
                                        }
                                        else {
                                            status = value.status
                                        }

                                        return <div key={index} >

                                            {timeDiff > 0 && value.postStatus1 === 'null' &&
                                                !(value.status === 'PENDING' || value.status === 'CANCELLED') &&

                                                <Modal
                                                    aria-labelledby="simple-modal-title"
                                                    aria-describedby="simple-modal-description"
                                                    open={this.state.postPopup}
                                                    onClose={this.postPopupClose}
                                                >
                                                    <center>
                                                        <div className={classes.paper}>

                                                            <Typography variant="body2" id="modal-title" className={classes.nickName} >
                                                                Was Meeting Successfull with
                                                         <br /><br />
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Avatar
                                                                        alt={value.nickName1}
                                                                        src={value.avatarURL1[0]}
                                                                        className={classes.popupAvatar}
                                                                    />
                                                                    <Avatar
                                                                        alt={value.nickName2}
                                                                        src={value.avatarURL2[0]}
                                                                        className={classes.popupAvatar}
                                                                    />
                                                                </div>
                                                                <br />
                                                                <span style={{ fontSize: '18px' }}>{value.displayName2}</span> ?
                                                    </Typography>

                                                            <br />
                                                            <Typography variant="caption" id="modal-title">
                                                                {/* Regent Plaza */}
                                                                {value.selectedLoc.name}
                                                            </Typography>
                                                            <Typography variant="caption" id="modal-title">
                                                                {/* Thursday, Nov 12, 2018, 4:05 A.M */}
                                                                {value.selectedDate}
                                                            </Typography>
                                                            <Typography variant="body2" id="modal-title" style={{ color: 'rgb(42, 196, 127)', marginTop: '5px' }}>
                                                                {/* 40 minutes */}
                                                                {value.duration[0]} minutes
                                                    </Typography>
                                                            <br />

                                                            <Button variant="contained" color="primary" autoFocus onClick={() => this.aboutMeeting(value, 'yes')} >
                                                                &nbsp; &nbsp;Yes&nbsp; &nbsp;
                                                    </Button> &nbsp; &nbsp;
                                                    <Button variant="contained" color="secondary" onClick={() => this.aboutMeeting(value, 'no')} >
                                                                &nbsp; &nbsp;No&nbsp; &nbsp;
                                                    </Button>

                                                        </div>
                                                    </center>
                                                </Modal>
                                            }


                                            <ExpansionPanelDetails className={classes.details}>
                                                {/* <div className={classes.column} /> */}
                                                <div className={classes.column}>
                                                    <Typography variant="subheading">{value.selectedLoc.name}</Typography>
                                                    <Typography variant="body1">{value.selectedDate}</Typography>
                                                </div>
                                                <div className={classes.helper}>
                                                    <Typography variant="body1">{value.selectedLoc.location.address}</Typography>
                                                    <Typography variant="caption">
                                                    Status: <span className={classes.link}>{status.toLowerCase()}</span>
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelDetails>

                                            {(value.status !== 'CANCELLED' && value.status !== 'PENDING') &&
                                                <div style={{ marginTop: '-10px' }}>
                                                    <AddToCalendar
                                                        event={event}
                                                        buttonTemplate={icon}
                                                        listItems={items}
                                                        buttonLabel="Add to Calendar"
                                                    />
                                                </div>
                                            }
                                            <Divider />
                                            <ExpansionPanelActions>
                                                <Button size="small"
                                                    disabled={value.status !== 'PENDING' ? true : false}
                                                    onClick={() => this.setMeeting(value, 'CANCELLED')}
                                                >
                                                    Cancel
                                                </Button>
                                            </ExpansionPanelActions>

                                        </div>
                                    })}

                                </ExpansionPanel>
                            })
                            }

                        </div>
                        :
                        <Typography variant="subtitle2" >
                            You haven’t done any meeting yet!
                        </Typography>
                }
            </div>
        );
    }
}


DashMeetings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashMeetings);