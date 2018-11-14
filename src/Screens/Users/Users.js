import React, { Component } from 'react';

import DashAvailable from '../../Components/DashComp/DashAvailable/DashAvailable'
import AuthState from '../../Helper/AuthState'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
 
});


class Users extends Component {

    constructor() {
        super()

        this.state = {
            openSnack: false,
        }
    }

    
    static getDerivedStateFromProps(props) {
        
        
        AuthState()
        const userAvail = JSON.parse(localStorage.getItem("user"));
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
        
        // console.log('derived',userAvail,'derived',userProfile)

        return {
            userAvail,
            userProfile,
        }
    }
    
    componentDidMount() {
        this.setState({ openSnack: true })
    }

    render() {
        const { userAvail, userProfile } = this.state;
        return (
            <center>
                <div>
                    {
                        userAvail ?
                            userProfile ?
                                <DashAvailable {...this.props}></DashAvailable>
                                :
                                this.props.history.push('/profile')
                            :
                            this.props.history.push('/')
                    }

                    <Snackbar
                        open={this.state.openSnack}
                        onClose={() => this.setState({ openSnack: false })}
                        TransitionComponent={Fade}
                        autoHideDuration={6000}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Choose a Person you want to Meet with</span>}
                    />

                </div>
            </center>
        );
    }
}
 

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
