import React, { Component } from 'react';
import firebase from '../../../Config/firebase';
import FileUploader from "react-firebase-file-uploader";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const styles = theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    // header: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     height: 50,
    //       paddingLeft: theme.spacing.unit * 4,
    //     backgroundColor: theme.palette.background.default,
    // },
    img: {
        height: 280,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
    margin: {
        margin: theme.spacing.unit,
    },
});
 

class Step2 extends Component {

    constructor() {
        super()

        this.state = {

            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: [
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
                'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80'
            ],

            activeStep: 0,
        };
    }


    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };



    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        const { avatarURL, activeStep } = this.state;
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images/usersProfile")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                avatarURL[activeStep] = url;
                this.setState({ avatarURL, });
            })
    };


    render() {
        const { classes, theme } = this.props;
        const { activeStep, avatarURL } = this.state;
        const maxSteps = avatarURL.length;

        return (
            <div>
                <form>
                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                </form>

                <div className={classes.root}>
                    <Paper square elevation={1}>
                        <Button variant='contained' color='secondary' style={{ width: '100%', height: '50px', borderRadius: '0px' }} >
                            <label>
                                click here to select your awesome pic
                            <FileUploader
                                    hidden
                                    accept="image/*"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref('images/usersProfile')}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </label>
                        </Button>
                        <img
                            className={classes.img}
                            src={avatarURL[activeStep]}
                            alt="Your Awesome Pic"
                        />
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            className={classes.mobileStepper}
                            nextButton={
                                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                                    Next
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    Back
                                </Button>
                            }
                        />
                    </Paper>
                </div>

            </div>
        );
    }
}

 
Step2.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Step2);