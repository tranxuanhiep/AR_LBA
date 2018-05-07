import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Picker,
  PickerItem,
  Dimensions
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Polyline from "@mapbox/polyline";
import CalloutStore from "../../redux/containers/containerMarkerCallout";
import FloatingButton from "../../redux/containers/containerFloattingButton";
import geolib from "geolib";
import Axios from "axios";
const { height, width } = Dimensions.get("screen");
import { Item } from "native-base";
import SearchBar from "react-native-searchbar";

export default class HomeMap extends React.Component {
  constructor(props) {
    super(props);
    dataRadius = ["2000", "1500", "1000", "500", "300", "200", "100"];
    this.state = {
      coords: [],
      results: [],
      modalVisible: false,
      selectedRadius: "2000",
      textInputValue: "",
      language: ""
    };
    this.mapRef = null;
    this._handleResults = this._handleResults.bind(this);
  }
  renderItemPickerRadius() {
    items = [];
    for (let item of dataRadius) {
      items.push(<Picker.Item key={item} label={item} value={item} />);
    }
    return items;
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _handleResults(results) {
    this.setState({ results });
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
    let index = 0;
    const data = [
      { key: index++, section: true, label: "Fruits" },
      { key: index++, label: "Red Apples" },
      { key: index++, label: "Cherries" },
      { key: index++, label: "Cranberries" },
      { key: index++, label: "Pink Grapefruit" },
      { key: index++, label: "Raspberries" },
      { key: index++, section: true, label: "Vegetables" },
      { key: index++, label: "Beets" },
      { key: index++, label: "Red Peppers" },
      { key: index++, label: "Radishes" },
      { key: index++, label: "Radicchio" },
      { key: index++, label: "Red Onions" },
      { key: index++, label: "Red Potatoes" },
      { key: index++, label: "Rhubarb" },
      { key: index++, label: "Tomatoes" }
    ];
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => {
            this.mapRef = ref;
          }}
          style={{ ...StyleSheet.absoluteFillObject }}
          showsUserLocation
        >
          {this.props.arrayMarker.map(marker => {
            var a = geolib.getDistance(
              {
                latitude: this.props.latitude,
                longitude: this.props.longitude
              },
              {
                latitude: parseFloat(marker.Store_Latitude),
                longitude: parseFloat(marker.Store_Longitude)
              }
            );
            console.log(a);
            if (a <= parseInt(this.state.selectedRadius)) {
             return (<MapView.Marker
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
              </MapView.Marker>);
            }
          })}
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor="#1E90FF"
          />
        </MapView>

        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <SearchBar
              ref={ref => (this.searchBar = ref)}
              data={this.props.arrayMarker}
              handleResults={this._handleResults}
              showOnLoad
              backButton={() => {
                this.setModalVisible(false);
              }}
              onBack={() => {
                this.setModalVisible(false);
              }}
            />
            {this.state.results.map((result, i) => {
              return (
                <Text key={i}>
                  {typeof result === "object" && !(result instanceof Array)
                    ? "gold object!"
                    : result.toString()}
                </Text>
              );
            })}
          </Modal>
        </View>
        <View
          style={{
            position: "absolute",
            top: 10,
            Left: 10,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Picker
            selectedValue={this.state.language}
            style={{ height: 50, width: width / 3 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <Picker
            selectedValue={this.state.selectedRadius}
            style={{ height: 50, width: width / 2.5 }}
            onValueChange={value => this.setState({ selectedRadius: value })}
          >
            {this.renderItemPickerRadius()}
          </Picker>
        </View>
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <TouchableOpacity
            onPress={() => {
              // this.searchBar.show();
              this.setModalVisible(true);
            }}
          >
            <Image
              style={{ height: 50, width: 50 }}
              source={{
                uri: "https://image.flaticon.com/icons/png/128/174/174315.png"
              }}
            />
          </TouchableOpacity>
        </View>
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
