import React, { Component } from "react";
import { relativeTimeRounding } from "moment";
import PhotoGrid from "react-native-thumbnail-grid";
const { height, width } = Dimensions.get("screen");
import moment from "moment";
const FBSDK = require("react-native-fbsdk");
import { Image, FlatList, ScrollView, View, Dimensions } from "react-native";
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
export const promotion = item => {
  state = {
    shareLinkContent: {
      contentTitle: "promotion aaaaa",
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
            <Text>{item.Store_Name}</Text>
            <Text note>{moment(item.Promotion_Created).fromNow()}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <PhotoGrid
            height={200}
            width={width * 0.9}
            source={item.Promotion_Image}
            onPressImage={() => {}}
          />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {item.Promotion_Title}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {new Date(item.Promotion_DateStart).toDateString()} --{" "}
            {new Date(item.Promotion_DateEnd).toDateString()}
          </Text>
          <Text style={{ fontSize: 15 }}>{item.Promotion_Description}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            transparent
            onPress={() => {
              alert("Aaaa");
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
            <Text>{item.TotalFavorite} Favorite</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../images/comment.png")}
            />
            <Text>{item.TotalComment} Comments</Text>
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
            <Text> Share</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};
