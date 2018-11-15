/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class GetDirection extends Component {
    constructor(props) {
        super(props)
        this.state = {

            err: null,
        }

        this.getDirections = this.getDirections.bind(this)
    }


    handleClose = () => {
        this.setState({ err: null });
    };


    // static getDerivedStateFromProps(props) {

    //     console.log(props)

    //     if (props.showDirections === true) {
    //         console.log(props.showDirections)
    //         // this.getDirections();
    //     }

    //     return null
    // }

    getDirections() {
        console.log('getDirections')
        const { coords, destination } = this.props
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(coords.latitude, coords.longitude),
            destination: new google.maps.LatLng(destination.latitude, destination.longitude),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                this.setState({
                    err: "Sorry! Can't calculate directions."
                })
            }
        });
    }

    render() {
        const { directions, err } = this.state
        const { coords, destination } = this.props
        // console.log("props", this.props)

        return (
            <div style={{ }}>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBrrOsrvThKXpEt-1ZoAP9DhpwRs1B5l4E&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `90vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    directions={directions}
                    coords={coords}
                    destination={destination}
                />

                <Dialog
                    open={err ? true : false}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`${err}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            There might be some issue while getting directions, Or may be this a network connectivity problem.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={12}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >

        <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }} />
        <Marker position={{ lat: props.destination.latitude, lng: props.destination.longitude }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))


export default GetDirection;