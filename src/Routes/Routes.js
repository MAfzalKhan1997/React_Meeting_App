import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from '../Components/AppBar/AppBar';
import App from '../Screens/App/App';
import Dashboard from '../Screens/Dashboard/Dashboard';
import Profile from '../Screens/Profile/Profile';
import Users from '../Screens/Users/Users';
import Location from '../Screens/Location/Location';

const Routes = () => {

    return (

        <Router>
            <div>

                <Route path='/' component={AppBar} />
                <Route exact path='/' component={App} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/users" component={Users} />
                <Route exact path='/users/location' component={Location} />
            </div>
        </Router >

    )
}

export default Routes;

// {/* <Route path='/Users' component={Users} ></Route> */}/