import React, { Component } from 'react';
import '../DashComp.css';

import firebase from '../../../Config/firebase';
import UserCard from './UserCard/UserCard';

import Cards, { Card } from 'react-swipe-deck';
import Geofire from 'geofire';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

// static getDerivedStateFromProps(props) {

//   AuthState()
//   const userAvail = JSON.parse(localStorage.getItem("user"));
//   const userProfile = JSON.parse(localStorage.getItem("userProfile"));

//   console.log('derived',userAvail,'derived',userProfile)

//   return {
//     userAvail,
//     userProfile, 
//   }
// }

// const data = ['Alexandre', 'Thomas', 'Lucien']

const styles = theme => ({
    paper: {
        position: 'absolute',
        maxWidth: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        borderRadius: '5px'
    },

    avatar: {
        // margin: 10,
        width: 50,
        height: 50,
    },
    bigAvatar: {
        margin: 10,
        width: 110,
        height: 110,
    },

});


class DashAvailable extends Component {

    constructor() {
        super()

        this.state = {
            filteredUsers: [],
            openDialog: false,
            dialogObj: {
                avatarURL: [],
            },
        }

        this.removeUser = this.removeUser.bind(this);
        this.dialogOpen = this.dialogOpen.bind(this);
        // this.selectUser = this.selectUser.bind(this);
    }

    componentWillMount() {

        let users = [];

        const userAvail = JSON.parse(localStorage.getItem("user"));
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        firebase.database().ref(`/profiles`).on('child_added', (data) => {


            if (userAvail.uid !== data.val().uid) {

                users.push(data.val());
                // console.log('users profile', users);

                let filteredUsers = users.filter((value, index) => {
                    let distance = Geofire.distance([userProfile.coords.latitude, userProfile.coords.longitude], [value.coords.latitude, value.coords.longitude]);
                    let beverages = userProfile.beverages.find(bev => value.beverages.find(bev2 => bev === bev2));
                    let duration = userProfile.mins.find(mins1 => value.mins.find(mins2 => mins1 === mins2));
                    if (distance <= 5 && beverages && duration) {

                        return value
                    }
                    return null
                })

                this.setState({ filteredUsers });
                // console.log('filetered', filteredUsers);

            }

            // localStorage.setItem("userProfile", JSON.stringify(data.val()));
        })

    }

    action(alert) {
        // console.log('action', alert)
    }

    removeUser(index) {
        const { filteredUsers } = this.state;

        filteredUsers.splice(index, 1)
        this.setState({ filteredUsers, })

        // console.log('remove', index)
        console.log('filtered', filteredUsers)
    }

    selectUser(obj) {
        this.setState({ openDialog: false })
        console.log('selected user', obj)

        this.props.history.push('/users/location', {userProfile: obj} )
    }

    dialogOpen(obj) { 

        if(this.props.location.pathname === "/users"){
        
            this.setState({
                openDialog: true,
                dialogObj: obj,
            });
        }
    };

    dialogClose = () => {
        this.setState({ openDialog: false });
    };

    render() {
        const { filteredUsers, dialogObj } = this.state;
        const { classes } = this.props;
        
        return (
            <div className='cardsDiv'>
                <Cards onEnd={() => this.action('end')} className='master-root' size={[320, 420]} cardSize={[300, 300]} >
                    {filteredUsers.map((item, index) =>
                        <Card
                            key={item}
                            onSwipeLeft={() => console.log('removed', index)}
                            onSwipeRight={() => this.dialogOpen(item)}>
                            <UserCard userObj={item} removeUser={this.removeUser} dialogOpen={this.dialogOpen} {...this.props.location}></UserCard>
                        </Card>
                    )}
                </Cards>


                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openDialog}
                    onClose={this.dialogClose}
                >
                    <center>
                        <div className={classes.paper}>
                            <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
                                <Avatar
                                    alt={dialogObj.displayName}
                                    src={dialogObj.avatarURL[1]}
                                    className={classes.avatar}
                                />
                                <Avatar
                                    alt={dialogObj.displayName}
                                    src={dialogObj.avatarURL[0]}
                                    className={classes.bigAvatar}
                                />

                                <Avatar
                                    alt={dialogObj.displayName}
                                    src={dialogObj.avatarURL[2]}
                                    className={classes.avatar}
                                />
                            </div>
 
                            <Typography variant="caption" id="modal-title" style={{ fontSize: '18px' }}>
                                Nice Choice!
                            </Typography>
                                <br />
                            <Typography variant="subtitle2" id="modal-title">
                                Do you want to meet <br/><span style={{ fontSize: '23px' }}>{dialogObj.displayName}</span> ?
                            </Typography>
                                <br />
                            <Button variant="outlined" onClick={this.dialogClose} color="secondary">
                                cancel
                            </Button> &nbsp; &nbsp;
                            <Button variant="contained" onClick={() => this.selectUser(dialogObj)} color="primary" autoFocus>
                                &nbsp;&nbsp;&nbsp; yes &nbsp;&nbsp;&nbsp;
                            </Button>
 
                        </div>
                    </center>
                </Modal>

            </div >
        );
    }
}


DashAvailable.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(DashAvailable);

// export default DashAvailableUsers;