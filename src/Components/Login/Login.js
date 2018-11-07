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

                    <FormControl className="formDiv">

                        <Typography variant="display2" >
                            Sign In
                        </Typography>
                        {/* <br /> */}

                        <Button className="formEle" variant="contained" color="secondary">
                            <SignIn></SignIn>
                        </Button>

                    </FormControl>
                </div>
            </center>
        );
    }
}

 
export default Login;