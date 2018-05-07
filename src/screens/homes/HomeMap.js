import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Picker,
  PickerItem,
  Dimensions,
  Text,
  ActivityIndicator
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Polyline from "@mapbox/polyline";
import CalloutStore from "../../redux/containers/containerMarkerCallout";
import FloatingButton from "../../redux/containers/containerFloattingButton";
import geolib from "geolib";
import Axios from "axios";
const { height, width } = Dimensions.get("screen");
import { Item, Card } from "native-base";
import SearchBar from "react-native-searchbar";
import ViewStore from "../../api/functionsApi/postViewStore";

export default class HomeMap extends React.Component {
  constructor(props) {
    super(props);
    dataRadius = ["2000", "1500", "1000", "500", "300", "200", "100"];
    dataCatalog = [
      { id: 0, value: "All" },
      { id: 1, value: "Food & Drink" },
      { id: 2, value: "Fashion" },
      { id: 3, value: "Entertainment place" },
      { id: 4, value: "Other" }
    ];
    this.state = {
      coords: [],
      results: "",
      modalVisible: false,
      selectedRadius: "2000",
      textInputValue: "",
      selectedCatalog: "All",
      idCatalog: 0
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
  renderItemPickerCatalog() {
    items = [];
    for (let item of dataCatalog) {
      items.push(
        <Picker.Item key={item.id} label={item.value} value={item.value} />
      );
    }
    return items;
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _handleResults() {
    this.props.onFetchSearch(this.state.results);
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
          {this.props.arrayAllMarker != [] ? (
            this.props.arrayAllMarker.map(marker => {
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
              if (
                a <= parseInt(this.state.selectedRadius) &&
                (marker.StoreCatalog_ID == this.state.idCatalog ||
                  this.state.idCatalog == 0)
              ) {
                return (
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
                        this.props.onFetchRatingStore(
                          marker.Store_ID,
                          Username,
                          1
                        );
                        this.props.onFetchPromotionsStore(
                          marker.Store_ID,
                          Username
                        );
                        ViewStore(marker.Store_ID, Username);
                        this.props.navigation.navigate("StoreTab");
                      }}
                    >
                      <CalloutStore marker={marker} />
                    </MapView.Callout>
                  </MapView.Marker>
                );
              }
            })
          ) : (
            <View />
          )}
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
              handleChangeText={input => {
                this.setState({ results: input });
              }}
              onSubmitEditing={() => {
                this._handleResults();
              }}
              showOnLoad
              backButton={() => {
                this.setModalVisible(false);
              }}
              onBack={() => {
                this.setModalVisible(false);
              }}
            />
            <View style={{ marginTop: 60 }}>
              {this.props.isLoading ? (
                <ActivityIndicator size="large" />
              ) : (
                this.props.dataSearch.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        let Username = "";
                        if (this.props.proFile != []) {
                          Username = this.props.proFile.id;
                        }
                        this.props.onFetchInformationStore(
                          item.Store_ID,
                          this.props.latitude,
                          this.props.longitude
                        );
                        this.props.onFetchRatingStore(
                          item.Store_ID,
                          Username,
                          1
                        );
                        this.props.onFetchPromotionsStore(
                          item.Store_ID,
                          Username
                        );
                        this.setModalVisible(false);
                        ViewStore(item.Store_ID, Username);
                        this.props.navigation.navigate("StoreTab");
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 10,
                          marginBottom: 10
                        }}
                      >
                        <Image
                          style={{ height: 50, width: 50 }}
                          source={{ uri: item.Store_ImageLink }}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text style={{ fontWeight: "bold" }}>
                            {" "}
                            {item.Store_Name}{" "}
                          </Text>
                          <Text style={{ fontStyle: "italic" }}>
                            {item.Store_Street}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </Modal>
        </View>
        <View
          style={{
            backgroundColor: "#f2f2f2",
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            width: width
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Picker
              selectedValue={this.state.selectedCatalog}
              style={{ height: 50, width: width / 2.5 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  selectedCatalog: itemValue,
                  idCatalog: itemIndex
                })
              }
            >
              {this.renderItemPickerCatalog()}
            </Picker>
            <Picker
              selectedValue={this.state.selectedRadius}
              style={{ height: 50, width: width / 2.5 }}
              onValueChange={value => this.setState({ selectedRadius: value })}
            >
              {this.renderItemPickerRadius()}
            </Picker>
          </View>
          <View style={{ top: 10, right: 10 }}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Image
                style={{ height: 30, width: 30 }}
                source={{
                  uri: "https://image.flaticon.com/icons/png/128/174/174315.png"
                }}
              />
            </TouchableOpacity>
          </View>
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
