import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Login.css';
import SignIn from '../SignIn/SignIn'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // showPass: false
        }
    }


    render() {

        return (
            <center>
                <div className='mainDiv'>
<br/>
                    <img
                        src={require("../../Images/handshake.png")}
                        alt='meetup'
                        width='65px'
                        height='62px'
                    />
                    <FormControl className="formDiv">

                        <Typography variant="h4" >
                            MeeTup
                        </Typography>
                        <br />
                        <br />
                        <Typography color='primary' variant="subheading" >
                            Get Started with FaceBook
                        </Typography>

                        <Button className="formEle" variant="contained" color="secondary">
                            <SignIn {...this.props}></SignIn>
                        </Button>

                    </FormControl>
                </div>
            </center>
        );
    }
}


export default Login;