import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import AuthState from '../../Helper/AuthState'

import 'typeface-roboto';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        textAlign: 'left',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MyAppBar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            myProps: props,
            userAvail: null,
            auth: true,
            anchorEl: null,
        };
    }


    //   handleChange = event => {
    //     this.setState({ auth: event.target.checked });
    //   };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    // componentDidMount() {

    // }

    static getDerivedStateFromProps() {
        AuthState()

        const userAvail = JSON.parse(localStorage.getItem("user"));
        // console.log(props)

        return {
            userAvail,
        }
    }

    render() {
        const { classes } = this.props;
        const { anchorEl, userAvail, myProps } = this.state;
        const open = Boolean(anchorEl);


        return (
            <div className={classes.root}>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            MeeTup
                        </Typography>

                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                {
                                    userAvail ?
                                        <div onClick={this.handleClose} style={{ outline: 'none' }}>
                                            <MenuItem>Profile</MenuItem>
                                            <MenuItem><SignOut {...myProps}></SignOut></MenuItem>
                                        </div>
                                        :
                                        <MenuItem onClick={this.handleClose}><SignIn {...myProps}></SignIn></MenuItem>
                                }
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAppBar);