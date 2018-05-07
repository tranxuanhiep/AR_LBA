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
import { promotion } from "../../components/customes/promotion";

export default class PromotionsOfStore extends Component {
  componentDidMount(){
    
  }
  render() {
    const { promotionsofStore } = this.props;
    const propsPromotion = this.props;
    if (promotionsofStore != [])
      return (
         promotion(item, propsPromotion, 0)
      );
    else return <View />;
  }
}
