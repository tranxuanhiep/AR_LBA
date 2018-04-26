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
import {promotion} from "../../components/customes/promotion"

export default class PromotionsOfStore extends Component {
  render() {
    const { promotionsofStore } = this.props;
    if (promotionsofStore != [])
      return (
        <FlatList
          keyExtractor={(item, index) => index}
          data={promotionsofStore}
          renderItem={({ item }) => 
            promotion(item)
          }
        />
      );
    else return <View />;
  }
}
