import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Polyline from "@mapbox/polyline";
import MapView, { Marker } from "react-native-maps";
import Axios from "axios";
import CalloutStore from "../../components/customesMap/MarkerCallOut";
import FloatingButton from "../../components/floatingButton/FloatingButton";
const { width, height } = Dimensions.get("window");
import DropdownAlert from "react-native-dropdownalert";
const ASPECT_RATIO = width / height;

export default class HomeMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = { coords: [] };
  }

  fitBottomTwoMarkers(startLoc, destinationLoc) {
    this.mapRef.fitToCoordinates([startLoc, destinationLoc], {
      edgePadding: {
        top: 400,
        right: 250,
        bottom: 50,
        left: 250
      },
      animated: true
    });
  }

  async getDirections(startLoc, destinationLoc) {
    await Axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
    )
      .then(respJson => {
        let points = Polyline.decode(
          respJson.data.routes[0].overview_polyline.points
        );
        let coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1]
          };
        });
        this.setState({ coords: coords });
      })
      .catch(error => {
        this.dropdown.alertWithType(
          error.name.toLowerCase(),
          error.name,
          error.message + "\nCan't get direction. Please connect network"
        );
      });
  }
  componentWillReceiveProps() {
    this.mapRef.fitToElements(true);
  }
  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={data => this.onClose(data)}
        />
        <MapView
          ref={ref => {
            this.mapRef = ref;
          }}
          style={{ ...StyleSheet.absoluteFillObject }}
          showsUserLocation
        >
          {this.props.arrayMarker.map(marker => (
            <MapView.Marker
              key={marker.Store_ID}
              coordinate={{
                latitude: parseFloat(marker.Store_Latitude),
                longitude: parseFloat(marker.Store_Longitude)
              }}
              image={
                marker.StoreCatalog_ID === 1
                  ? require("../../images/coffee.png")
                  : marker.StoreCatalog_ID === 2
                    ? require("../../images/cloth.png")
                    : marker.StoreCatalog_ID === 3
                      ? require("../../images/entertainment.png")
                      : require("../../images/none.png")
              }
              onPress={() => {
                this.getDirections(
                  "" + this.props.latitude + "," + this.props.longitude,
                  "" + marker.Store_Latitude + "," + marker.Store_Longitude
                );
                this.fitBottomTwoMarkers(
                  {
                    latitude: this.props.latitude,
                    longitude: this.props.longitude
                  },
                  {
                    latitude: parseFloat(marker.Store_Latitude),
                    longitude: parseFloat(marker.Store_Longitude)
                  }
                );
              }}
            >
              <MapView.Callout>
                <CalloutStore marker={marker} />
              </MapView.Callout>
            </MapView.Marker>
          ))}
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor="#1E90FF"
          />
        </MapView>
        <FloatingButton
          icon="list"
          onPress={() => {
            this.props.navigation.navigate("HomeList");
          }}
        />
      </View>
    );
  }
}
