import React, { Component } from "react";
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
import { relativeTimeRounding } from "moment";
import PhotoGrid from "react-native-thumbnail-grid";
const { height, width } = Dimensions.get("screen");
export default class PromotionsOfStore extends Component {
  render() {
    const { promotionsofStore } = this.props;
    if (promotionsofStore != [])
      return (
        <FlatList
          keyExtractor={(item, index) => index}
          data={promotionsofStore}
          renderItem={({ item }) => (
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={{ uri: item.Promotion_Image }} />
                  <Body>
                    <Text>{item.Store_Name}</Text>
                    <Text note>April 15, 2016</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <PhotoGrid
                    height={200}
                    width={width * 0.9}
                    source={item.Store_ImageLink}
                    onPressImage={() => {}}
                  />
                  <Text>{item.Promotion_Description}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent
                  onPress={()=>{
                    alert("Aaaa")
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
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>
          )}
        />
      );
    else return <View />;
  }
}
