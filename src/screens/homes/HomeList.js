import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl,
  Image
} from "react-native";
import viewPromotion from "../../api/functionsApi/postViewPromotion";
const { width, height } = Dimensions.get("window");
import load from "../../images/load.gif";
import GridView from "react-native-super-grid";
import styles from "../../stylesheets/StyleHomeList";
import distance from "../../images/estimatedistance.png";
import time from "../../images/estimatetime.png";

export default class HomeList extends React.Component {
  componentWillMount() {
    this.props.onFetchPromotions(this.props.latitude, this.props.longitude);
    this.props.onFetchTopPromotions(
      9,
      this.props.latitude,
      this.props.longitude
    );
  }
  getImagePromotion = item => {
    let imageList = item.split(",");
    let link = imageList[0];
    return <Image source={{ uri: link }} style={styles.imagePromotion} />;
  };
  getImageTopPromotions = item => {
    let imageList = item.split(",");
    let link = imageList[0];
    return <Image source={{ uri: link }} style={styles.imageTopPromotion} />;
  };
  showLoadingAtTopPromotions() {
    if (this.props.arrayTopPromotions.length == 0) {
      return (
        <View style={{
          height:230,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}>
          {/* <ActivityIndicator size="large" color={"#ffffff"} /> */}
          <Image
            style={{ width: 60, height: 60 }}
            source={load}
          />
        </View>
      );
    }
  }
  showLoadingAtOdinaryPromotions() {
    if (this.props.arrayPromotions.length == 0) {
      return (
        <View style={{
          height:300,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}>
          {/* <ActivityIndicator size="large" color={"#ffffff"} /> */}
          <Image
            style={{ width: 60, height: 60 }}
            source={load}
          />
        </View>
      );
    }
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "silver" }}>
        {/********* Top Promotions ************/}
        <View
          style={{
            backgroundColor: "white",
            marginTop: 5
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#000",
              backgroundColor: "transparent",
              margin: 10
            }}
          >
            Top Promotions
          </Text>
        </View>
        <View style={{ height: 230, width }}>
          <FlatList
            style={{
              backgroundColor: "transparent"
            }}
            horizontal={true}
            data={this.props.arrayTopPromotions}
            renderItem={({ item, index }) => {
              return (
                <View style={[styles.TopMain, { margin: 5 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.onFetchDetailPromotion(
                        item.Promotion_ID,
                        this.props.proFile.id
                      );
                      this.props.onFetchInformationStore(
                        item.Store_ID,
                        this.props.latitude,
                        this.props.longitude
                      );
                      this.props.onFetchPromotionsStore(
                        item.Store_ID,
                        this.props.proFile.id
                      );
                      this.props.navigation.navigate("DetailPromotion");
                      viewPromotion(
                        item.Promotion_ID,
                        this.props.proFile.id
                      ).then(Data => { });
                    }}
                  >
                    <View>
                      {/* Iamge of shop */}
                      {this.getImageTopPromotions(item.Promotion_Image)}
                      {/* Icon type and Shop's name */}
                      <View style={styles.TopcoverimageType}>
                        <View style={styles.CoverTopimageType}>
                          <Image
                            style={styles.imageTypeTop}
                            source={
                              item.StoreCatalog_ID === 1
                                ? {
                                  uri:
                                    "https://png.icons8.com/ios/40/000000/cafe-filled.png"
                                }
                                : item.StoreCatalog_ID === 2
                                  ? {
                                    uri:
                                      "https://png.icons8.com/ios/40/000000/shirt-filled.png"
                                  }
                                  : item.StoreCatalog_ID === 3
                                    ? {
                                      uri:
                                        "https://png.icons8.com/ios/40/000000/carousel-filled.png"
                                    }
                                    : {
                                      uri:
                                        "https://png.icons8.com/ios/40/000000/inscription-filled.png"
                                    }
                            }
                            style={{
                              width: 30,
                              height: 30,
                              tintColor: "white"
                            }}
                          />
                        </View>
                        {/* Shop's name */}
                        <View style={styles.TopcoverNameAndRate}>
                          <Text style={styles.ToptextName} numberOfLines={1}>
                            {item.Store_Name}
                          </Text>
                        </View>
                        <View style={styles.topDistanceTime}>
                          {/* Distance */}
                          <View style={styles.coverDistance}>
                            <Image
                              style={styles.TopcoverIcon}
                              source={distance}
                            />
                            <Text style={styles.Toptext}>{item.Distance}</Text>
                          </View>
                          {/* Estime time */}
                          <View style={styles.coverTime}>
                            <Image style={styles.TopcoverIcon} source={time} />
                            <Text style={styles.Toptext}>{item.Duration}'</Text>
                          </View>
                        </View>
                      </View>
                      {/* Title and Address */}
                      <View style={styles.TopcoverTextInform}>
                        <Text numberOfLines={1} style={styles.TopTitle}>
                          {item.Promotion_Title}
                        </Text>
                        <Text numberOfLines={1} style={styles.TopAddress}>
                          {item.Promotion_Description}
                        </Text>
                      </View>
                      {/* Open- close */}
                      <View style={styles.coverTopOpenClose}>
                        <Text style={styles.textDayTopPromotion}>
                          Start day: {item.Promotion_DateStart.split("T")[0]}
                        </Text>
                        <Text style={styles.textDayTopPromotion}>
                          End day : {item.Promotion_DateEnd.split("T")[0]}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => item.Promotion_ID}
          />
          {this.showLoadingAtTopPromotions()}
        </View>
        {/************* Odinary Promotion *************/}
        <View style={{ flex: 1, backgroundColor: "silver" }}>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 5
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#000",
                backgroundColor: "transparent",
                margin: 10
              }}
            >
              Promotions
            </Text>
          </View>
          <GridView
            itemDimension={130}
            items={this.props.arrayPromotions}
            renderItem={item => (
              <View style={styles.Main}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.onFetchDetailPromotion(
                      item.Promotion_ID,
                      this.props.proFile.id
                    );
                    this.props.onFetchInformationStore(
                      item.Store_Details_ID,
                      this.props.latitude,
                      this.props.longitude
                    );
                    this.props.onFetchPromotionsStore(
                      item.Store_Details_ID,
                      this.props.proFile.id
                    );
                    this.props.navigation.navigate("DetailPromotion");
                    viewPromotion(
                      item.Promotion_ID,
                      this.props.proFile.id
                    ).then(Data => { });
                  }}
                >
                  <View>
                    {this.getImagePromotion(item.Promotion_Image)}
                    <View style={styles.coverHeart}>
                      <TouchableOpacity>
                        <Image
                          style={styles.imageHeart}
                          source={{
                            uri:
                              "https://png.icons8.com/flat_round/40/000000/like.png"
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* Icon type */}
                    <View style={styles.coveMainType}>
                      <View
                        style={{
                          width: width / 4,
                          height: 1,
                          backgroundColor: "rgba(115, 115, 115, 0.69)"
                        }}
                      />
                      {/* <View style={styles.coverimageType} > */}
                      <View style={styles.coverimageType}>
                        <Image
                          source={
                            item.StoreCatalog_Name === "Food & Drink"
                              ? {
                                uri:
                                  "https://png.icons8.com/ios/40/000000/cafe-filled.png"
                              }
                              : item.StoreCatalog_Name === "Fashion"
                                ? {
                                  uri:
                                    "https://png.icons8.com/ios/40/000000/shirt-filled.png"
                                }
                                : item.StoreCatalog_Name ===
                                  "Entertainment place"
                                  ? {
                                    uri:
                                      "https://png.icons8.com/ios/40/000000/carousel-filled.png"
                                  }
                                  : {
                                    uri:
                                      "https://png.icons8.com/ios/40/000000/inscription-filled.png"
                                  }
                          }
                          style={styles.imageType}
                        />
                      </View>
                      <View
                        style={{
                          width: width / 4,
                          height: 1,
                          backgroundColor: "rgba(115, 115, 115, 0.69)"
                        }}
                      />
                    </View>
                    <View style={styles.coverTextInform}>
                      {/* Shop's name */}
                      <View style={styles.coverNameAndRate}>
                        <Text style={styles.textName} numberOfLines={1}>
                          {item.Store_Name}
                        </Text>
                        {/* Title    */}
                      </View>
                      <Text numberOfLines={1} style={styles.textTitle}>
                        {item.Promotion_Title}
                      </Text>
                    </View>
                    {/* cover time open-close and distance-duration */}
                    <View style={styles.coverOpenCloseDistanceRuration}>
                      {/* Open- close */}
                      <View style={styles.coverOpenClose}>
                        <Text style={styles.textOpenClose}>
                          Open: {item.Store_OpenTime}
                        </Text>
                        <Text style={styles.textOpenClose}>
                          Close: {item.Store_CloseTime}
                        </Text>
                      </View>
                      <View style={styles.distanceTime}>
                        {/* Distance */}
                        <View style={styles.coverDistance}>
                          <Image style={styles.coverIcon} source={distance} />
                          <Text style={styles.text}>{item.Distance}</Text>
                        </View>
                        {/* Estime time */}
                        <View style={styles.coverTime}>
                          <Image style={styles.coverIcon} source={time} />
                          <Text style={styles.text}>{item.Duration}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
          {this.showLoadingAtOdinaryPromotions()}
        </View>
      </ScrollView>
    );
  }
}
