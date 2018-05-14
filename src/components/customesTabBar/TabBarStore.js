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
                        width: width / 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: width / 2,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onPress={() => this.props.navigation.navigate("DetailStore")}
                    >
                        <Image
                            style={{ height: 25, width: 25 }}
                            source={
                                this.props.navigationState.index === 0
                                    ? require("../../images/TabBar/shopFull.png")
                                    : require("../../images/TabBar/shopNull.png")
                            }
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        width: width / 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: width / 2,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onPress={() => this.props.navigation.navigate("PromotionsOfStore")}
                    >
                        <Image
                            style={{ height: 28, width: 28 }}
                            source={
                                this.props.navigationState.index === 1
                                    ? require("../../images/TabBar/saleFull.png")
                                    : require("../../images/TabBar/saleNull.png")
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
