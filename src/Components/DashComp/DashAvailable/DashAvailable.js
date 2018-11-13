import React, { Component } from 'react';
import '../DashComp.css';

import firebase from '../../../Config/firebase';
import UserCard from './UserCard/UserCard';

import Cards, { Card } from 'react-swipe-deck';
import Geofire from 'geofire';

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


class DashAvailable extends Component {

    constructor() {
        super()

        this.state = {
            data: ['Alexandre', 'Thomas', 'Lucien'],
        }
    }

    componentWillMount() {
        let users = [];

        const userAvail = JSON.parse(localStorage.getItem("user"));
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        firebase.database().ref(`/profiles`).on('child_added', (data) => {
            
            
            if (userAvail.uid !== data.val().uid) {

                users.push(data.val());
                console.log('users profile', users);
                
                let filteredUsers = users.filter((value, index) => {
                    let distance = Geofire.distance([userProfile.coords.latitude,userProfile.coords.longitude], [value.coords.latitude,value.coords.longitude]);
                    let beverages = userProfile.beverages.find(bev => value.beverages.find(bev2 => bev === bev2));
                    let duration = userProfile.mins.find(mins1 => value.mins.find(mins2 => mins1 === mins2));
                    if (distance <= 5 && beverages && duration) {
                        
                        return value
                    }
                    return null
                })

                this.setState({ filteredUsers });
                console.log('filetered', this.state.filteredUsers);

            }

            // localStorage.setItem("userProfile", JSON.stringify(data.val()));
        })

    }

    action(alert) {
        // console.log('action', alert)
    }

    removeUser(index) {
        const { data } = this.state;

        data.splice(index, 1)
        this.setState({ data, })

        // console.log('remove', index)
        // console.log('data', data)
    }

    selectUser(alert) {
        // console.log('select', alert)
    }

    render() {
        const { data } = this.state;
        // console.log('render', data)
        return (
            <div className='cardsDiv'>
            <Cards onEnd={() => this.action('end')} className='master-root'  size={[320,420]} cardSize={[300,300]} >
                {data.map((item, index) =>
                    <Card
                        // style={{ backgroundColor: 'grey' }}
                        key={item}
                        onSwipeLeft={() => console.log('removed', index)}
                        onSwipeRight={() => this.selectUser(index)}>
                        <UserCard></UserCard>
                    </Card>
                )}
            </Cards>
            </div>
        );
    }
}

export default DashAvailable;
