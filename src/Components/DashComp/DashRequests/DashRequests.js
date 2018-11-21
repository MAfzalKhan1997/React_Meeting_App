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
        // marginRight: '20px',
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
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    bigAvatar: {
        // boxShadow: '0 0 40px rgb(155, 0, 72)',
        marginRight: 20,
        width: 60,
        height: 60,
    },
});


class DashRequests extends Component {

    constructor() {
        super()

        this.state = {
            // meetings: null,
            meetings: [],
            meetingsKey: [],
        }
    }


    componentWillMount() {

        const { meetings, meetingsKey } = this.state;

        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        firebase.database().ref(`/meetingsArea/${userProfile.uid}/requestsSec`).on('child_added', (data) => {

            meetingsKey.push(data.key)
            // console.log(meetingsKey)
            meetings.push(data.val())
            
            this.setState({ 
                // userProfile, 
                meetings, 
                meetingsKey 
            })

        })
    }

    setMeeting(meeting,index,status){

        const { meetingsKey } = this.state;
        
        const meetingObj = {

            displayName1: meeting.displayName1,
            nickName1: meeting.nickName1,
            avatarURL1: meeting.avatarURL1,
            contact1: meeting.contact1,
            email1: meeting.email1,
            uid1: meeting.uid1,

            displayName2: meeting.displayName2,
            nickName2: meeting.nickName2,
            avatarURL2: meeting.avatarURL2,
            contact2: meeting.contact2,
            email2: meeting.email2,
            uid2: meeting.uid2,

            status: status,
            selectedDate: meeting.selectedDate,
            selectedLoc: meeting.selectedLoc,
            duration: meeting.duration,
        }

        console.log(meetingObj,index)
        
        var updates = {};
        updates[`/meetingsArea/${meeting.uid1}/meetingsSec/${meeting.uid2}/meetings/` + meetingsKey[index]] = meetingObj;
        updates[`/meetingsArea/${meeting.uid2}/requestsSec/` + meetingsKey[index]] = meetingObj;
      
        return firebase.database().ref().update(updates)
        .then(resp => {
            console.log(status,resp)
        })


    }

    render() {
        // console.log(this.state.meetings)

        const { meetings } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {
                    meetings.length !== 0 ?
                        // 'meetings available'

                        <div className={classes.root}>

                            {meetings.map((value, index) => {

                                let event = {
                                    title: `Meet ${value.nickName1}`,
                                    description: `Have a meetup with ${value.displayName1} at ${value.selectedLoc.name}`,
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

                                return <ExpansionPanel key={index}>

                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div>
                                            <Avatar
                                                className={classes.bigAvatar}
                                                alt={value.nickName1}
                                                src={value.avatarURL1[0]}
                                            />
                                        </div>
                                        <div style={{ textAlign: 'left', }}>
                                            <Typography variant="body2">{value.displayName1}</Typography>
                                            <Typography variant="caption">{value.nickName1}</Typography>
                                            {/* <Typography variant="caption">4.5</Typography> */}
                                        </div>
                                    </ExpansionPanelSummary>

                                    <ExpansionPanelDetails className={classes.details}>
                                        {/* <div className={classes.column} /> */}
                                        <div className={classes.column}>
                                            <Typography variant="subheading">{value.selectedLoc.name}</Typography>
                                            <Typography variant="body1">{value.selectedDate}</Typography>
                                        </div>
                                        <div className={classes.helper}>
                                            <Typography variant="body1">{value.selectedLoc.location.address}</Typography>
                                            <Typography variant="caption">
                                                Status:{value.status}
                                            </Typography>
                                        </div>
                                    </ExpansionPanelDetails>

                                    <div style={{ marginTop: '-10px' }}>
                                        <AddToCalendar
                                            event={event}
                                            buttonTemplate={icon}
                                            listItems={items}
                                            buttonLabel="Add to Calendar"
                                        />
                                    </div>

                                    <Divider />
                                    <ExpansionPanelActions>
                                        <Button size="small" onClick={() => this.setMeeting(value,index,'CANCELLED')}>
                                            Cancel
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => this.setMeeting(value,index,'ACCEPTED')}>
                                            Accept
                                        </Button>
                                    </ExpansionPanelActions>

                                </ExpansionPanel>
                            })
                            }

                        </div>
                        :
                        <Typography variant="subtitle2" >
                            You haven’t any request yet!
                        </Typography>
                }
            </div>
        );
    }
}


DashRequests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashRequests);