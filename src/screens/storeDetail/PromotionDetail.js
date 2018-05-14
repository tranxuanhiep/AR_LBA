import React, { Component } from "react";
import {
  Image,
  FlatList,
  ScrollView,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
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
import TimeAgo from "react-native-timeago";
import load from "../../images/load.gif";
const { width, height } = Dimensions.get('window');
export default class PromotionsOfStore extends Component {
  constructor(props) {
    super(props);
    this.state = { text: undefined, page: 2, isLoadingMore: false };
  }
  onChangeText = text => {
    if (this.props.proFile.id == null) {
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
            onPress: () => this.props.navigation.navigate("Authentications")
          }
        ],
        { cancelable: false }
      );
    } else this.setState({ text: text });
  };
  onSubmitEditing = ({ nativeEvent: { text } }) =>
    this.setState({ text: text }, this.submit);

  submit = async () => {
    const { text } = this.state;
    if (text != undefined) {
      let username = "";
      if (this.props.proFile != []) {
        username = this.props.proFile.id;
      }
      this.props.onpostCommentPromotion(
        this.props.informationPromotion.Promotion_ID,
        username,
        text
      );
      this.setState({
        text: undefined
      });
    } else {
      alert("Please enter your comment first");
    }
  };

  render() {
    const { informationPromotion } = this.props;
    const propsPromotion = this.props;
    if (this.props.isLoading)
      return (
        <View style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}>
          {/* <ActivityIndicator size="large" /> */}
          <Image
            style={{ width: 60, height: 60 }}
            source={load}
          />
        </View>
      );
    else {
      if (informationPromotion != null)
        return (
          <ScrollView>
            {promotion(informationPromotion, propsPromotion, 2)}
            <View>
              <KeyboardAvoidingView behavior="position">
                <View style={styles.container}>
                  <TextInput
                    placeholder="Add a comment and rating..."
                    keyboardType="twitter"
                    style={styles.input}
                    value={this.state.text}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                  />
                  <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text
                      style={[
                        styles.text,
                        !this.state.text ? styles.inactive : []
                      ]}
                    >
                      Post
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
            <Card>
              <FlatList
                keyExtractor={(item, index) => index}
                data={this.props.listCommentPromotion}
                renderItem={({ item }) => (
                  <View style={stylesa.container}>
                    <View style={stylesa.avatarContainer}>
                      <Image
                        resizeMode="contain"
                        style={stylesa.avatar}
                        source={{ uri: item.Image }}
                      />
                    </View>
                    <View style={stylesa.contentContainer}>
                      <Text>
                        <Text style={[stylesa.text, stylesa.name]}>
                          {item.FullName + ": "}
                        </Text>
                        <Text style={stylesa.text}>{item.Comment}</Text>
                      </Text>
                      <TimeAgo time={item.Time_Log} />
                    </View>
                  </View>
                )}
              />
            </Card>
          </ScrollView>
        );
      else return <View />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    paddingLeft: 15
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  inactive: {
    color: "#CCC"
  },
  text: {
    color: "#3F51B5",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  }
});
const stylesa = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  avatarContainer: {
    alignItems: "center",
    marginLeft: 5,
    paddingTop: 10,
    width: 40
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    padding: 5
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#EEE",
    width: 36,
    height: 36
  },
  text: {
    color: "#000",
    fontFamily: "Avenir",
    fontSize: 15
  },
  name: {
    fontWeight: "bold"
  },
  created: {
    color: "#BBB"
  }
});
