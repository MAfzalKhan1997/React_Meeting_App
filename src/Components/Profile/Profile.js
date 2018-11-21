import React, { Component } from 'react';
import firebase from '../../Config/firebase';

import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';
import Step4 from './Step4/Step4';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// import Snackbar from '@material-ui/core/Snackbar';
// import Fade from '@material-ui/core/Fade';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    // margin: {
    //     margin: theme.spacing.unit,
    // },
    close: {
        padding: theme.spacing.unit / 2,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
        marginBottom: '-5px',
        fontSize: '20px'
    },
});


class Profile extends Component {

    constructor() {
        super()
        this.state = {
            nickName: '',
            contact: '',
            avatarURL: [],
            beverages: [],
            mins: [],
            coords: null,

            activeStep: 0,
        };

        this.updateText = this.updateText.bind(this);
        this.getAvatars = this.getAvatars.bind(this);
        this.getBevs = this.getBevs.bind(this);
        this.getMins = this.getMins.bind(this);
        this.getCoords = this.getCoords.bind(this);

    }


    // static getDerivedStateFromProps() {

    // const userAvail = JSON.parse(localStorage.getItem("user"));
    // console.log(userAvail)

    // firebase.database().ref(`/profiles/${userAvail.uid}/`).set({name:'afzal'})

    // return null

    // }

    async updateText(e) {

        if (e.target.name === 'Nickname') {
            await this.setState({ nickName: e.target.value })
            // console.log('nick', this.state.nickName)
        }
        else
            if (e.target.name === 'Contact') {
                await this.setState({ contact: e.target.value })
                // console.log('contact', this.state.contact)
            }
    }

    async getAvatars(avatars) {

        await this.setState({ avatarURL: avatars })
        console.log('avatarURL', this.state.avatarURL)
    }

    async getBevs(bevs) {

        await this.setState({ beverages: bevs })
        console.log('beverages', this.state.beverages)
    }

    async getMins(mins) {

        await this.setState({ mins: mins })
        console.log('mins', this.state.mins)
    }

    async getCoords(coords) {

        await this.setState({ coords, })
        console.log('coords', this.state.coords)
    }


    getSteps = () => {
        return ['Nickname/Contact', 'Your Cool Pics | *3 Req', 'Beverages/Duration | *both atleast 1 or more*', 'Set Location'];
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Step1 updateText={this.updateText}></Step1>

            case 1:
                return <Step2 getAvatars={this.getAvatars}></Step2>

            case 2:
                return <Step3 getBevs={this.getBevs} getMins={this.getMins}></Step3>

            case 3:
                return <Step4 getCoords={this.getCoords}></Step4>

            default:
                return 'Unknown step';
        }
    }


    handleNext = () => {
        const { activeStep, nickName, contact, avatarURL, beverages, mins, coords } = this.state;

        switch (activeStep) {
            case 0:
                if ((nickName && contact) === '') {
                    this.setState(state => ({
                        snackOpen: true,
                    }));
                }
                else {
                    this.setState(state => ({
                        activeStep: state.activeStep + 1,
                    }));
                }
                break;

            case 1:
                if (avatarURL.length !== 3) {
                    this.setState(state => ({
                        snackOpen: true,
                    }));
                }
                else {
                    this.setState(state => ({
                        activeStep: state.activeStep + 1,
                    }));
                }
                break;

            case 2:
                if ((beverages.length >= 1) && (mins.length >= 1)) {
                    this.setState(state => ({
                        activeStep: state.activeStep + 1,
                    }));
                }
                else {
                    this.setState(state => ({
                        snackOpen: true,
                    }));
                }
                break;

            case 3:
                if (coords) {
                    this.setState(state => ({
                        activeStep: state.activeStep + 1,
                    }));
                }
                else {
                    this.setState(state => ({
                        snackOpen: true,
                    }));
                }
                break;

            default:
                return 'Unknown step';
        }
        // this.setState(state => ({
        //     activeStep: state.activeStep + 1,
        // }));
    };

    handleBack = () => {
        const { activeStep } = this.state;

        switch (activeStep) {

            case 1:
                this.setState(state => ({
                    nickName: '',
                    contact: '',
                    avatarURL: [],

                    activeStep: state.activeStep - 1,
                }));
                break;

            case 2:
                this.setState(state => ({
                    avatarURL: [],
                    beverages: [],
                    mins: [],

                    activeStep: state.activeStep - 1,
                }));
                break;

            case 3:
                this.setState(state => ({
                    beverages: [],
                    mins: [],
                    coords: null,

                    activeStep: state.activeStep - 1,
                }));
                break;

            default:
                return 'Unknown step';
        }
        // this.setState(state => ({
        //     activeStep: state.activeStep - 1,
        // }));
    };

    handleReset = () => {

        this.setState({
            nickName: '',
            contact: '',
            avatarURL: [],
            beverages: [],
            mins: [],
            coords: null,

            activeStep: 0,
        });
    };

    handleClose = () => {
        this.setState({ snackOpen: false });
    };

    createDatabase() {
        const { nickName, contact, avatarURL, beverages, mins, coords } = this.state;

        const userAvail = JSON.parse(localStorage.getItem("user"));

        const profileObj = {

            displayName: userAvail.displayName,
            email: userAvail.email,
            uid: userAvail.uid,
            nickName,
            contact,
            avatarURL,
            beverages,
            mins,
            coords,
        }

        console.log(profileObj)

        firebase.database().ref("/").child("profiles/" + userAvail.uid).set(profileObj)
            .then(() => {
                localStorage.setItem("userProfile", JSON.stringify(profileObj));
                console.log("Profile created in DataBase.");
                this.props.history.push('/dashboard')
            })
            .catch(function (error) {
                console.log('Error:', error.message)
            });

    }

    render() {
        const { classes, text, btnText } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <div>
                <Snackbar
                    //   key={key}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.snackOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    //   onExited={this.handleExited}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">
                        <InfoIcon className={classes.iconVariant} />
                        Please give necessary details </span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />

                <div className={classes.root}>

                    <Typography variant="title">
                    {
                        text ? 
                        text
                        :
                        'Create Profile'
                        }
                    </Typography>

                    <Stepper activeStep={activeStep} orientation="vertical" style={{ textAlign: 'left' }}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {this.getStepContent(index)}
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                            </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&quot;re finished now</Typography>
                            <Button onClick={() => { this.createDatabase() }} variant='outlined' size="large" color='secondary' className={classes.button}>
                            {
                        btnText ? 
                        btnText
                        :
                        'Create Profile'
                        }
                  </Button>
                            <br />
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
                  </Button>
                        </Paper>
                    )}
                </div>

            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Profile);
