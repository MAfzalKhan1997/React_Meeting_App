import React, { Component } from 'react';
import './App.css';

import AppBar from '../../Components/AppBar/AppBar'
import Login from '../../Components/Login/Login'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {

    };

  }


  handleClick() {
 
    this.props.history.push('/profile')
  }

  static getDerivedStateFromProps() {


    const userAvail = JSON.parse(localStorage.getItem("user"));
    // console.log(userAvail)
    // { userAvail ? ()=>this.handleClick() : null }

    // return {
    //     null,
    // }
  }

  render() {
    return (
      <center>
        <div>
          <AppBar></AppBar>
          <Login></Login>
        </div>
      </center>
    );
  }
}

export default App;
