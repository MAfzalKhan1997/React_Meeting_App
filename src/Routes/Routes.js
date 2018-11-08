import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from '../Components/AppBar/AppBar';
import App from '../Screens/App/App';
import Profile from '../Screens/Profile/Profile';


const Routes = () => {

    return (

        <Router>
            <div>
 
                <Route path='/' component={AppBar} />
                <Route exact path='/' component={App} />
                <Route path="/profile" component={Profile} />
  
            </div>
        </Router >

    )
}

export default Routes;

// {/* <Route path='/Users' component={Users} ></Route> */}/
// {/* <Route path='/Dashboard' component={Dashboard} ></Route> */ }