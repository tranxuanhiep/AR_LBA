import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Dimensions
} from "react-native";
import load from "../../images/load.gif";
const { width, height } = Dimensions.get("window");
import moment from "moment";
import TimeAgo from "react-native-timeago";
import { Card } from "native-base";
import PhotoGrid from "react-native-thumbnail-grid";
import StarRating from "react-native-star-rating";
import Communications from "react-native-communications";
import MapView, { Marker } from "react-native-maps";

export default class DetailStore extends Component {
  constructor(props) {
    super(props);
    this.fetchMore = this._fetchMore.bind(this);
    this.fetchData = this._fetchData.bind(this);
    this.state = {
      starCount: 0,
      text: undefined,
      page: 2,
      isLoading: true,
      isLoadingMore: false
    };
  }

  _fetchMore() {
    this.fetchData();
    this.setState({
      isLoadingMore: false
    });
  }
  _fetchData() {
    this.props.onFetchRatingStore(
      this.props.informationStore.Store.Store_ID,
      this.props.proFile.id,
      this.state.page
    );
    this.setState({
      page: this.state.page + 1
    });
  }
  onChangeText = text => {
    if (this.props.proFile.id == null) {
      Alert.alert(
        "Rating",
        "You need to be logged in to perform this function.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("Authentications")
          }
        ],
        { cancelable: false }
      );
    } else this.setState({ text: text });
  };
  onSubmitEditing = ({ nativeEvent: { text } }) =>
    this.setState({ text: text }, this.submit);

  submit = async () => {
    const { text, starCount } = this.state;
    if (text != undefined) {
      let username = "";
      if (this.props.proFile != []) {
        username = this.props.proFile.id;
      }
      this.props.onAddRating({
        storeID: this.props.informationStore.Store.Store_ID,
        username: username,
        comment: text,
        rating: starCount
      });
      this.setState({
        text: undefined,
        starCount: 0
      });
    } else {
      alert("Please enter your comment first");
    }
  };
  onStarRatingPress(rating) {
    if (this.props.proFile.id == null) {
      Alert.alert(
        "Rating",
        "You need to be logged in to perform this function.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("Authentications")
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ starCount: rating });
    }
  }
  render() {
    if (!this.props.isLoadingStore) {
      return (
        <ScrollView style={{ backgroundColor: "Gray" }}>
          <Card>
            <PhotoGrid
              height={300}
              source={this.props.informationStore.imageList}
              onPressImage={() => { }}
            />
          </Card>
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10
                }}
              >
                <Image
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                  source={{
                    uri: this.props.informationStore.Store.Store_ImageLink
                  }}
                />
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#000"
                    }}
                  >
                    {this.props.informationStore.Store.Store_Name.replace(
                      /(^|\s)\S/g,
                      l => l.toUpperCase()
                    )}
                  </Text>
                  <Text style={{ fontSize: 12, width: 200 }}>
                    {this.props.informationStore.Store.Store_Street}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start"
                    }}
                  >
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={
                        this.props.informationStore.Store.Average_Rating
                      }
                      fullStarColor={"#FFCC00"}
                      starSize={15}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 12,
                        marginBottom: 0,
                        fontStyle: "italic"
                      }}
                    >
                      ({this.props.informationStore.Store.NumberOfRating}{" "}
                      {this.props.informationStore.Store.NumberOfRating <= 2
                        ? " review"
                        : " reviews"})
                      </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ height: 23, width: 23, marginRight: 30 }}
                    source={
                      this.props.informationStore.open
                        ? require("../../images/open.png")
                        : require("../../images/close.png")
                    }
                  />
                  {/* <Text style={{ marginLeft: 10 }}>
                    {this.props.informationStore.Store.Store_OpenTime} --{" "}
                    {this.props.informationStore.Store.Store_CloseTime}
                  </Text> */}
                </View>

                <TouchableOpacity
                  onPress={() => {
                    Communications.phonecall(
                      this.props.informationStore.Store.Store_PhoneNumber,
                      true
                    );
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{
                        height: 23,
                        width: 23,
                        marginRight: 30,
                        marginTop: 10
                      }}
                      source={require("../../images/phone.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
          <Card>
            <View style={{ height: 120, marginLeft: 100 }}>
              <MapView
                style={{ ...StyleSheet.absoluteFillObject }}
                region={{
                  latitude: parseFloat(
                    this.props.informationStore.Store.Store_Latitude
                  ),
                  longitude: parseFloat(
                    this.props.informationStore.Store.Store_Longitude
                  ),
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(
                      this.props.informationStore.Store.Store_Latitude
                    ),
                    longitude: parseFloat(
                      this.props.informationStore.Store.Store_Longitude
                    )
                  }}
                />
              </MapView>
            </View>
            <Image
              style={{ flexDirection: "column", position: "absolute", height: 120, justifyContent: 'flex-start', }}
              source={require("../../images/opacityImage.png")}
              resizeMode='stretch'
            >
            </Image>
            <View style={{ flexDirection: "column", position: "absolute" }}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginTop: 10,
                    marginLeft: 10,
                    tintColor: "black"
                  }}
                  source={require("../../images/distance.png")}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: "#000"
                  }}
                >
                  {this.props.informationStore.Store.Distance}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Image
                  style={{
                    height: 16,
                    width: 16,
                    marginTop: 10,
                    marginLeft: 10,
                    tintColor: "black"
                  }}
                  source={require("../../images/time.png")}
                />
                <Text
                  style={{
                    marginLeft: 14,
                    fontWeight: "bold",
                    color: "#000"
                  }}
                >
                  {this.props.informationStore.Store.Duration}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                    tintColor: "black"
                  }}
                  source={require("../../images/price.png")}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: "#000"
                  }}
                >
                  {this.props.informationStore.Store.Store_PriceMin} VND –{" "}
                  {this.props.informationStore.Store.Store_PriceMax} VND
                  </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Image
                  style={{
                    height: 17,
                    width: 17,
                    marginLeft: 12,
                    marginBottom: 10,
                    tintColor: "black"
                  }}
                  source={require("../../images/timeOpenClose.png")}
                />
                <Text
                  style={{
                    marginLeft: 11,
                    fontWeight: "bold",
                    color: "#000"
                  }}
                >
                  {this.props.informationStore.Store.Store_OpenTime}' –{" "}
                  {this.props.informationStore.Store.Store_CloseTime}'
                  </Text>
              </View>
            </View>
          </Card>
          <Card>
            <Text style={{ marginLeft: 10, marginRight: 10 }}>
              {this.props.informationStore.Store.Store_Description}
            </Text>
          </Card>

          <Card>
            {this.props.listRatingStore.Rated != true ? (
              <View>
                <View
                  style={{
                    paddingLeft: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}
                >
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={rating => this.onStarRatingPress(rating)}
                    fullStarColor={"#FFCC00"}
                  />
                </View>
                <KeyboardAvoidingView behavior="position">
                  <View style={styles.container}>
                    <TextInput
                      placeholder="Add a comment and rating..."
                      keyboardType="twitter"
                      style={styles.input}
                      value={this.state.text}
                      onChangeText={this.onChangeText}
                      onSubmitEditing={this.onSubmitEditing}
                    />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.submit}
                    >
                      <Text
                        style={[
                          styles.text,
                          !this.state.text ? styles.inactive : []
                        ]}
                      >
                        Post
                        </Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </View>
            ) : (
                <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                  You have rated this Shop
                </Text>
              )}
          </Card>
          <Card>
            <FlatList
              keyExtractor={(item, index) => index}
              data={this.props.listRatingStore.list_comments}
              renderItem={({ item }) => (
                <View style={stylesa.container}>
                  <View style={stylesa.avatarContainer}>
                    <Image
                      resizeMode="contain"
                      style={stylesa.avatar}
                      source={{ uri: item.Image }}
                    />
                  </View>
                  <View style={stylesa.contentContainer}>
                    <Text>
                      <Text style={[stylesa.text, stylesa.name]}>
                        {item.FullName}:
                        </Text>
                      <Text style={stylesa.text}>{item.Comment}</Text>
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={item.Rating_Store}
                        fullStarColor={"#FFCC00"}
                        starSize={15}
                      />
                    </View>
                    <TimeAgo time={item.Time_Log} />
                  </View>
                </View>
              )}
            // onEndReached={() =>
            //   this.setState({ isLoadingMore: true }, () => this.fetchMore())
            // }
            // ListFooterComponent={() => {
            //   return (
            //     this.state.isLoadingMore && (
            //       <View style={{ flex: 1, padding: 10 }}>
            //         <ActivityIndicator size="small" />
            //       </View>
            //     )
            //   );
            // }}
            />
          </Card>
        </ScrollView>
      );
    } else
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          {/* <ActivityIndicator size="large" /> */}
          <Image
            style={{ width: 60, height: 60 }}
            source={load}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    paddingLeft: 15
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  inactive: {
    color: "#CCC"
  },
  text: {
    color: "#3F51B5",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  }
});

const stylesa = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  avatarContainer: {
    alignItems: "center",
    marginLeft: 5,
    paddingTop: 10,
    width: 40
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    padding: 5
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#EEE",
    width: 36,
    height: 36
  },
  text: {
    color: "#000",
    fontFamily: "Avenir",
    fontSize: 15
  },
  name: {
    fontWeight: "bold"
  },
  created: {
    color: "#BBB"
  }
});
