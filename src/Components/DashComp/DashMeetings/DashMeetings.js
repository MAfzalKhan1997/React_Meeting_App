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


class DashMeetings extends Component {

    constructor() {
        super()

        this.state = { 
            meeters: [],
        }
    }


    componentWillMount() {

        const { meeters } = this.state;

        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        firebase.database().ref(`/meetingsArea/${userProfile.uid}/meetingsSec`).on('child_added', (data) => {

            meeters.push(data.val())
            // console.log('updated')
            this.setState({ meeters })

        })
    }

    setMeeting(meeting,key,status){

        // const { meetingsKey } = this.state;
        
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

        console.log(meetingObj,key)
        
        var updates = {};
        updates[`/meetingsArea/${meeting.uid1}/meetingsSec/${meeting.uid2}/meetings/` + key ] = meetingObj;
        updates[`/meetingsArea/${meeting.uid2}/requestsSec/` + key ] = meetingObj;
      
        return firebase.database().ref().update(updates)
        .then(resp => {
            console.log(status,resp)
        })


    }

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
                                let meetingsKey = []

                                let data = value.meetings
                                for (let key in data) {
                                    // console.log(data[key])
                                    meetingsKey.push(key)
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
                                        return <div key={index} >
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

                                            <div style={{ marginTop: '-10px'}}>
                                                    <AddToCalendar
                                                        event={event}
                                                        buttonTemplate={icon}
                                                        listItems={items}
                                                        buttonLabel="Add to Calendar"
                                                    />
                                            </div>
                                            
                                            <Divider />
                                            <ExpansionPanelActions>
                                                    <Button size="small" onClick={() => this.setMeeting(value,meetingsKey[index],'CANCELLED')}>
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