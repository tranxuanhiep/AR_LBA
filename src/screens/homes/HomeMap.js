import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Polyline from "@mapbox/polyline";
import CalloutStore from "../../redux/containers/containerMarkerCallout";
import FloatingButton from "../../redux/containers/containerFloattingButton";
import Axios from "axios";
import { Item } from "native-base";

export default class HomeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { coords: [] };
    this.mapRef = null;
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
      .catch(error => {});
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
  componentWillReceiveProps() {
    this.mapRef.fitToElements(true);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
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
                const startLoc =
                  this.props.latitude + "," + this.props.longitude;
                const destinationLoc =
                  marker.Store_Latitude + "," + marker.Store_Longitude;
                this.getDirections(startLoc, destinationLoc);
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
              <MapView.Callout
                onPress={async () => {
                  let Username = "";
                  if (this.props.proFile != []) {
                    Username = this.props.proFile.id;
                  }
                  this.props.onFetchInformationStore(
                    marker.Store_ID,
                    this.props.latitude,
                    this.props.longitude
                  );
                  this.props.onFetchRatingStore(marker.Store_ID, Username, 1);
                  this.props.onFetchPromotionsStore(81, Username);
                  this.props.navigation.navigate("StoreTab");
                }}
              >
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
