import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { promotion } from "../../components/customes/promotion";
export default class Favorites extends Component {
  componentDidMount() {
    if (this.props.proFile.id != null)
      this.props.onFetchFavoriteByUser(this.props.proFile.id);
      console.log(this.props.proFile.id);
  }
  render() {
    if (this.props.favoriteByUser != []) {
      const propsPromotion = this.props;
      return (
        <FlatList
          keyExtractor={(item, index) => index}
          data={this.props.favoriteByUser}
          renderItem={({ item }) => promotion(item, propsPromotion)}
        />
      );
    }
    return <View />;
  }
}
