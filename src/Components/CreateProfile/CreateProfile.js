import React, { Component } from 'react';
import firebase from '../../Config/firebase';

import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import Person from '@material-ui/icons/PersonOutlined';
// import LocalPhone from '@material-ui/icons/LocalPhoneOutlined';


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
});


class CreateProfile extends Component {

    constructor() {
        super()
        this.state = {
            activeStep: 0,
        };
    }


    // static getDerivedStateFromProps() {

    // const userAvail = JSON.parse(localStorage.getItem("user"));
    // console.log(userAvail)

    // firebase.database().ref(`/profiles/${userAvail.uid}/`).set({name:'afzal'})

    // return null

    // }

    getSteps = () => {
        return ['Nickname/Contact', 'Your Cool Pics', 'Beverages/Duration', 'Set Location'];
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Step1></Step1>

            case 1:
                return <Step2></Step2>

            case 2:
                return <Step3></Step3>

            case 3:
                return null

            default:
                return 'Unknown step';
        }
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
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
                        <Button variant='outlined' color='secondary' className={classes.button}>
                            Create Profile
                  </Button>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                  </Button>
                    </Paper>
                )}
            </div>
        );
    }
}

CreateProfile.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(CreateProfile);
