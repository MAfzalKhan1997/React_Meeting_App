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

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
// import MailIcon from '@material-ui/icons/MailOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import StarIcon from '@material-ui/icons/StarBorderOutlined';
import SendIcon from '@material-ui/icons/SendOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

// let userAvail = JSON.parse(localStorage.getItem("user"));

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

    list: {
        width: 250,
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
            
            sidePanel: false,
        };
    }
    
    static getDerivedStateFromProps() {
        AuthState()

        const userAvail = JSON.parse(localStorage.getItem("user"));

        return {
            userAvail,
        }
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
    

    toggleDrawer = (open) => () => {
        this.setState({
            sidePanel: open,
        });
    };
    
    render() {
        const { classes } = this.props;
        const { anchorEl, userAvail, myProps } = this.state;
        const open = Boolean(anchorEl);
        
        const drawer1 = [<DashboardIcon/>];
        const drawer2 = [<InboxIcon/>,<StarIcon/>,<SendIcon/>];
        const drawer3 = [<DeleteIcon/>,<ErrorIcon/>];
        
        const sideList = (
            <div className={classes.list}>
                <List>
                    {['Dashboard'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{drawer1[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{drawer2[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{drawer3[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                
                {userAvail ?
                    <SwipeableDrawer
                        open={this.state.sidePanel}
                        onClose={this.toggleDrawer(false)}
                        onOpen={this.toggleDrawer(true)}
                    >
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer(false)}
                            onKeyDown={this.toggleDrawer(false)}
                        >
                            {sideList}
                        </div>
                    </SwipeableDrawer>
                    :
                    null
                }

                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
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
                                            {/* {console.log('meri', myProps)} */}
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