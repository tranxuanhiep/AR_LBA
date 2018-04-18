import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  NativeModules
} from "react-native";
import Colors from "../../colors/Colors";
import Styles from "../../stylesheets/StyleTabBar";
const { width, height } = Dimensions.get("screen");
const activityStarter = NativeModules.ActivityStarter;
export default class TabBar extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#f2f2f2",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <View
          style={{
            width: width / 5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Image
              source={
                this.props.navigationState.index === 0
                  ? require("../../images/TabBar/HomeChoose.png")
                  : require("../../images/TabBar/HomeNull.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width / 5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Favorites")}
          >
            <Image
              source={
                this.props.navigationState.index === 1
                  ? require("../../images/TabBar/FavoriteChoose.png")
                  : require("../../images/TabBar/FavoriteNull.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width / 5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              activityStarter.navigateToExample(
                JSON.stringify(this.props.arrayMarker)
              );
            }}
          >
            <Image source={require("../../images/TabBar/camera.png")} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width / 5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Notifications")}
          >
            <Image
              source={
                this.props.navigationState.index === 2
                  ? require("../../images/TabBar/NotificationChoose.png")
                  : require("../../images/TabBar/NotificationNull.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width / 5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Authentications")}
          >
            <Image
              source={
                this.props.navigationState.index === 3
                  ? require("../../images/TabBar/PersonChoose.png")
                  : require("../../images/TabBar/PersonNull.png")
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
