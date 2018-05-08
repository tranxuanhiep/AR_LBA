import React, { Component } from "react";
import PhotoGrid from "react-native-thumbnail-grid";
const { height, width } = Dimensions.get("screen");
import TimeAgo from "react-native-timeago";
const FBSDK = require("react-native-fbsdk");
import viewPromotion from "../../api/functionsApi/postViewPromotion";
import { Image, Dimensions, Alert } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
const { ShareDialog } = FBSDK;
shareLinkWithShareDialog = () => {
  var tmp = this;
  ShareDialog.canShow(this.state.shareLinkContent)
    .then(function(canShow) {
      if (canShow) {
        return ShareDialog.show(tmp.state.shareLinkContent);
      }
    })
    .then(
      function(result) {
        if (result.isCancelled) {
          alert("Share cancelled");
        } else {
          alert("Share success with postId: " + result.postId);
        }
      },
      function(error) {
        alert("Share fail with error: " + error);
      }
    );
};
export const promotion = (item, props, type) => {
  const listImage = item.Promotion_Image.split(",");
  state = {
    shareLinkContent: {
      contentTitle: "promotion",
      contentType: "link",
      contentImage:
        "https://s3-ap-southeast-1.amazonaws.com/capstone2/18-04-12-07-26-162034_22-01.jpg",
      contentUrl:
        "https://s3-ap-southeast-1.amazonaws.com/capstone2/foody-mobile-foody-banh-trang-nuo-873-635998520650984455.jpg",
      contentDescription: "Wow, check out this great site!"
    }
  };
  return (
    <Card style={{ flex: 0 }}>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: item.Store_ImageLink }} />
          <Body>
            <Text style={{ fontWeight: "bold" }}>{item.Store_Name}</Text>
            <TimeAgo
              style={{ fontSize: 13, fontStyle: "italic" }}
              time={item.Promotion_Created}
            />
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <PhotoGrid
            height={200}
            width={width * 0.9}
            source={listImage}
            onPressImage={() => {
              viewPromotion(item.Promotion_ID, props.proFile.id).then(Data => {
                alert(Data.data.message.success);
              });
            }}
          />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {item.Promotion_Title}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            {new Date(item.Promotion_DateStart).toDateString()} –{" "}
            {new Date(item.Promotion_DateEnd).toDateString()}
          </Text>
          <Text style={{ fontSize: 12 }}>{item.Promotion_Description}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            transparent
            onPress={() => {
              if (props.proFile.id == null) {
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
                      onPress: () =>
                        props.navigation.navigate("Authentications")
                    }
                  ],
                  { cancelable: false }
                );
              } else {
                props.favorite(
                  item.Promotion_ID,
                  props.proFile.id,
                  item.Store_Details_ID
                );
              }
            }}
          >
            <Image
              style={{ height: 20, width: 20 }}
              source={
                item.checkFavorite
                  ? require("../../images/TabBar/FavoriteChoose.png")
                  : require("../../images/TabBar/FavoriteNull.png")
              }
            />
            <Text style={{ fontSize: 11 }}>{item.TotalFavorite} Favorite</Text>
          </Button>
        </Left>
        <Body>
          <Button
            transparent
            onPress={() => {
              if (type == 0) {
                props.onFetchDetailPromotion(
                  item.Promotion_ID,
                  props.proFile.id
                );
                props.navigation.navigate("DetailPromotion");
              }
            }}
          >
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../images/comment.png")}
            />
            <Text style={{ fontSize: 11 }}>{item.TotalComment} Comments</Text>
          </Button>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              this.shareLinkWithShareDialog();
            }}
          >
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../images/share.png")}
            />
            <Text style={{ fontSize: 11 }}> Share</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};
