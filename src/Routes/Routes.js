import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from '../Screens/App/App';
import Profile from '../Screens/Profile/Profile';


const Routes = () => {
    // const userAvail = JSON.parse(localStorage.getItem("user"));

    return (

        <Router>
            <div>
                {/* {console.log(userAvail)} */}
                {/* {userAvail ? */}
                {/* <div> */}
                {/* </div> */}
                {/* : */}
                <Route exact path='/' component={App} />
                <Route path="/profile" component={Profile} />
                {/* } */}

            </div>
        </Router >

    )
}

export default Routes;

// {/* <Route path='/Users' component={Users} ></Route> */}/
// {/* <Route path='/Dashboard' component={Dashboard} ></Route> */ }