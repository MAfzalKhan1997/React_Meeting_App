import React, { Component } from 'react';
// import './Dashboard.css';

import firebase from '../../../Config/firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
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
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
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
            // meetings: null,
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

    render() {

        console.log(this.state.meeters)

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
                                        <div style={{textAlign: 'left',}}>
                                            <Typography variant="body2">{value.displayName}</Typography>
                                            <Typography variant="caption">{meetings[0].nickName}</Typography>
                                            {/* <Typography variant="caption">4.5</Typography> */}
                                        </div>
                                    </ExpansionPanelSummary>

                                    {meetings.map((value, index) => {

                                        return <div>
                                            <ExpansionPanelDetails className={classes.details}>
                                                <div className={classes.column} />
                                                <div className={classes.column}>
                                                    <Chip label="Barbados" className={classes.chip} onDelete={() => { }} />
                                                </div>
                                                <div className={classNames(classes.column, classes.helper)}>
                                                    <Typography variant="caption">
                                                        Select your destination of choice
              <br />
                                                        <a href="#sub-labels-and-columns" className={classes.link}>
                                                            Learn more
                                                        </a>
                                                    </Typography>
                                                </div>
                                            </ExpansionPanelDetails>
                                            <Divider />
                                            <ExpansionPanelActions>
                                                <Button size="small">Cancel</Button>
                                                <Button size="small" color="primary">
                                                    Save
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