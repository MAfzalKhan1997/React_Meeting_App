import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from '../App/App';

class Routes extends Component {
    render() {
        return (

            <Router>
                <div>
                    <Route exact path='/' component={App} ></Route>
                    {/* <Route path='/Dashboard' component={Dashboard} ></Route> */}
                    {/* <Route path='/Profile' component={Profile} ></Route> */}
                    {/* <Route path='/Users' component={Users} ></Route> */}
                </div>
            </Router>

        )
    }
}
export default Routes;