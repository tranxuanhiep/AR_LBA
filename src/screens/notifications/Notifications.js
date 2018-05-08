import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, Image, FlatList } from "react-native";
export default class Notifications extends Component {
    componentDidMount() {
        this.props.onFetchNotification(this.props.proFile.id, 2, this.props.latitude, this.props.longitude)
    }
    showLoading() {
        if (this.props.notification.length == 0) {
            return (
                <View style={{ flex: 1, backgroundColor: 'red' }} >
                    <ActivityIndicator size="large" color={"red"} />
                </View>
            );
        }
    }
    render() {
        return (
            <View>
                <FlatList
                    style={{
                        backgroundColor: 'transparent',
                    }}
                    data={this.props.notification}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.onFetchDetailPromotion(item.Promotion_ID, this.props.proFile.id);
                                    this.props.onFetchInformationStore(
                                        item.Store_ID,
                                        this.props.latitude,
                                        this.props.longitude
                                    );
                                    this.props.onFetchPromotionsStore(item.Store_ID, this.props.proFile.id);
                                    this.props.navigation.navigate("DetailPromotion");
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginLeft: 10,
                                        marginBottom: 10,
                                        marginTop:10
                                    }}
                                >
                                    <Image
                                        style={{ height: 50, width: 50 }}
                                        source={{ uri: item.Store_ImageLink }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {" "}
                                            {item.Promotion_Title}{" "}
                                        </Text>
                                        <Text style={{ fontStyle: "italic" }}>
                                            {item.Promotion_Description}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.Promotion_ID}
                >
                </FlatList>
                {this.showLoading()}
            </View>
        );
    }
}


