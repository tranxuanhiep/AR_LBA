import React from "react";
import { View, TouchableOpacity, Text, Dimensions, Image } from "react-native";
const { height, width } = Dimensions.get("window");
import styles from "../../stylesheets/StyleStoreOnMapView";
import StarRating from "react-native-star-rating";

export default class StoreOnMapView extends React.Component {
  render() {
    let image =
      this.props.marker.StoreCatalog_ID == 1
        ? "https://png.icons8.com/ios/40/000000/cafe-filled.png"
        : this.props.marker.StoreCatalog_ID == 2
          ? "https://png.icons8.com/ios/40/000000/shirt-filled.png"
          : this.props.marker.StoreCatalog_ID == 3
            ? "https://png.icons8.com/ios/40/000000/carousel-filled.png"
            : "https://png.icons8.com/ios/40/000000/inscription-filled.png";
    return (
      <View style={styles.Main}>
        <View style={styles.coverViewOfIcon}>
          <Image style={styles.coverIconDetail} source={{ uri: image }} />
        </View>
        <View style={styles.coverInformationStore}>
          <Text style={styles.textNameOfStore} numberOfLines={1}>
            {this.props.marker.Store_Name}
          </Text>
          <Text numberOfLines={1}>
            {this.props.marker.Store_Street +
              ", " +
              this.props.marker.Store_Ward +
              ", " +
              this.props.marker.Store_District}
          </Text>
          <View style={styles.coverRating}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.props.marker.Average_Rating}
              fullStarColor={"#FFCC00"}
              starSize={15}
            />
            <Text style={[styles.textAddress, { marginLeft: 5 }]}>
              ({this.props.marker.NumberOfRating} reviews)
            </Text>
          </View>
          <View style={styles.coverDistanceAndDuration}>
            <View style={styles.coverDistance}>
              <Image
                style={styles.imageDistance}
                source={{
                  uri:
                    "https://png.icons8.com/ios-glyphs/25/95a5a6/navigation.png"
                }}
              />
              <Text style={[styles.textAddress]}>
                {this.props.marker.Distance}
              </Text>
            </View>
            <View style={styles.coverDuration}>
              <Image
                style={styles.imageDuration}
                source={{
                  uri: "https://png.icons8.com/material/25/95a5a6/time.png"
                }}
              />
              <Text style={[styles.textAddress]}>
                {this.props.marker.Duration}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
