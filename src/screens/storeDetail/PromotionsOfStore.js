import React, { Component } from "react";
import {
  Image,
  FlatList,
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator
} from "react-native";
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
import { promotion } from "../../components/customes/promotion";

export default class PromotionsOfStore extends Component {
  render() {
    const { promotionsofStore } = this.props;
    const propsPromotion = this.props;
    if (promotionsofStore != [])
      return (
        <FlatList
          keyExtractor={(item, index) => index}
          data={promotionsofStore}
          renderItem={({ item }) => promotion(item, propsPromotion, 0)}
        />
      );
    else
      return (
        <View style={{ backgroundColor: "#F5FCFF" }}>
          <ActivityIndicator size="large" />
        </View>
      );
  }
}
