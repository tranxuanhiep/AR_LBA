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
    if (promotionsofStore != []) {
      return (
        <View>
          <View
            style={{ backgroundColor: 'white', marginBottom: 5, height: 35 }}
          >
            <Text
              style={{ marginLeft: 10,marginTop:5, fontWeight:'bold'  }}>
              Promotion Progressing
            </Text>
          </View>
          <FlatList
            keyExtractor={(item, index) => index}
            data={promotionsofStore.promotionProgressing}
            renderItem={({ item }) => promotion(item, propsPromotion, 0)}
          />
          <View
            style={{ backgroundColor: 'white', marginBottom: 5, height: 35 }}
          >
            <Text
              style={{  marginLeft: 10,marginTop:5, fontWeight:'bold'  }}>
              Promotion Future
            </Text>
          </View>
          <FlatList
            keyExtractor={(item, index) => index}
            data={promotionsofStore.promotionFuture}
            renderItem={({ item }) => promotion(item, propsPromotion, 0)}
          />
          <View
            style={{ backgroundColor: 'white', marginBottom: 5, height: 35 }}
          >
            <Text
              style={{  marginLeft: 10,marginTop:5, fontWeight:'bold' }}>
              Promotion Past
            </Text>
          </View>
          <FlatList
            keyExtractor={(item, index) => index}
            data={promotionsofStore.promotionPast}
            renderItem={({ item }) => promotion(item, propsPromotion, 0)}
          />
        </View>
      );
    } else
      return (
        <View style={{ backgroundColor: "#F5FCFF" }}>
          <ActivityIndicator size="large" />
        </View>
      );
  }
}
