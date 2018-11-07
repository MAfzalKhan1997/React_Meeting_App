import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from '../Screens/App/App';
import Profile from '../Screens/Profile/Profile';

class Routes extends Component {

    constructor(props){
        super(props)

    }

    render() {

        // const userAvail = JSON.parse(localStorage.getItem("user"));

        return (

            <Router>
                <div>
                    {/* {console.log(userAvail)} */}

                    <Route path='/' component={App} ></Route>
                    <Route path="/profile" component={Profile} ></Route>

                </div>
            </Router >

        )
    }
}

export default Routes;

// {/* <Route path='/Users' component={Users} ></Route> */}/
// {/* <Route path='/Dashboard' component={Dashboard} ></Route> */ }