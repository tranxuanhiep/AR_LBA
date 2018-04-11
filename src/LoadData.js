import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Main from "./screens/Main";
import Authentication from './screens/authentications/Authentications'
import SplashScreen from "react-native-splash-screen";

export default class LoadData extends Component {
  componentDidMount() {
    
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.props.getLocationUser(
          (latitude = position.coords.latitude),
          (longitude = position.coords.longitude)
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
    SplashScreen.hide();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  render() {
    return <Main/>
  }
}
