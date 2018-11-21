import React, { Component } from 'react';
// import './Dashboard.css';

import DashMeetings from './DashMeetings/DashMeetings'
import DashRequests from './DashRequests/DashRequests'
import DashAvailable from './DashAvailable/DashAvailable'
// import AuthState from '../../Helper/AuthState'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';


function TabContainer({ children, dir }) {
    // console.log(children._self.state.value)
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
});


//   static getDerivedStateFromProps(props) {

//     AuthState()
//     const userAvail = JSON.parse(localStorage.getItem("user"));
//     const userProfile = JSON.parse(localStorage.getItem("userProfile"));

//     console.log('derived',userAvail,'derived',userProfile)

//     return {
//       userAvail,
//       userProfile, 
//     }
//   }


class DashComp extends Component {

    constructor() {
        super()

        this.state = {

            value: 0,
            openSnack: false,
        }
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    goToUsers(){

        this.props.history.push('/users')
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                        scrollable
                    >
                        <Tab label="Meetings" />
                        <Tab label="Requests" />
                        <Tab label="Available" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}><DashMeetings /></TabContainer>
                    <TabContainer dir={theme.direction}><DashRequests /></TabContainer>
                    <TabContainer dir={theme.direction}><DashAvailable {...this.props} /></TabContainer>
                </SwipeableViews>

                <Button variant="fab" color="primary" onClick={() => this.goToUsers()}
                    style={{
                        position: 'fixed',
                        bottom: '15px',
                        right: '15px',
                    }} >
                    <AddIcon />
                </Button>

            </div>
        );
    }
}

DashComp.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DashComp);
