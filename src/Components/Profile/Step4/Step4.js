import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    maxWidth: '700px',
    minWidth: '200px',
  },

  progress: {
    marginTop: '110px',
    marginBottom: '110px',
  },
});


class Step4 extends Component {


  constructor() {
    super();

    this.state = {
      coords: null
    };

    this.getCurrPosition = this.getCurrPosition.bind(this);
  }


  componentWillMount() {
    this.setPosition();
  }



  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        coords:
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
      this.props.getCoords(this.state.coords)
      // console.log('initialset', this.state.coords);
    })
  }

  getCurrPosition({ latitude, longitude }) {

    this.setState({ coords: { latitude, longitude } })
    this.props.getCoords(this.state.coords)
    // console.log('getcurr', this.state.coords);
  }
 

  render() {
    const { classes } = this.props;
    const { coords } = this.state;
    return (
      <div>
        <Paper className={classes.root} elevation={2}>
          {
            coords ? <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `40vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              coords={coords}
              getCurrentPosition={this.getCurrPosition}
            />
              :
              <center>
                <CircularProgress className={classes.progress} />
              </center>
          }
        </Paper>
      </div>
    )
  }
}




const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    // defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
      draggable={true}
      onDragEnd={position => {
        // console.log(position.latLng.lat(), position.latLng.lng());
        props.getCurrentPosition({ latitude: position.latLng.lat(), longitude: position.latLng.lng() });
      }} />}
  </GoogleMap>
))



Step4.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Step4);