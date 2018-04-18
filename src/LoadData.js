import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid
} from "react-native";
import Main from "./screens/Main";
import Authentication from "./screens/authentications/Authentications";
import SplashScreen from "react-native-splash-screen";
import getStoreByRadius from "./api/functionsApi/getStoreByRadius";
import DropdownAlert from "react-native-dropdownalert";
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
              getStoreByRadius(2, latitude, longitude)
                .then(reasonJson => {
                  let success = reasonJson.data.message.success;
                  if (success) {
                    let arrayMarker =
                      reasonJson.data.data.StoreDetailsRadianViewModel;
                    this.props.getLocationUser(
                      latitude,
                      longitude,
                      arrayMarker
                    );
                    SplashScreen.hide();
                  }
                })
                .catch(error => {
                  SplashScreen.hide();
                  this.dropdown.alertWithType(
                    error.name.toLowerCase(),
                    error.name,
                    error.message +
                      "\nCan't get location store. Please connect network"
                  );
                });
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
  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={data => this.onClose(data)}
        />
        <Main />
      </View>
    );
  }
}
