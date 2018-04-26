import React, { Component } from "react";
import {
  View,
  StatusBar,
  PermissionsAndroid
} from "react-native";
import Main from "./redux/containers/containerMain";

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
  } catch (err) {
    console.warn(err);
  }
}

export default class LoadData extends Component {
  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.watchId = navigator.geolocation.watchPosition(
          position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            this.props.onFetchStores(latitude, longitude);
          },
          {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 1000,
            distanceFilter: 10
          }
        );
      }
    } catch (err) {
      console.warn(err);
    }
    requestCameraPermission();
  }
  
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Main />
      </View>
    );
  }
}
