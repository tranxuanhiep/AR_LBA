import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from "react-native";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
const FBSDK = require("react-native-fbsdk");
const { LoginButton, AccessToken, LoginManager } = FBSDK;

export class LoginAnimation extends Component {
  async _signIn() {
    await GoogleSignin.signIn()
      .then(user => {
        this.props.onSigninFBorGG();
        this.props.navigation.navigate("HomeMap");
      })
      .catch(err => {
        console.log("WRONG SIGNIN", err);
      })
  }
  _signOut() {
    GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => {
        this.props.onSignoutFBorGG();
        this.props.navigation.navigate("HomeMap");
      })
      .catch(error => console.log(error))
      .done();
  }
  render() {
    if (this.props.types === 0) {
      return (
        <View style={styles.container}>
          <Image
            style={{ width: 185, height: 200, marginBottom: 20 }}
            source={require("../../images/logo.png")}
          />
          <GoogleSigninButton
            style={{ width: 200, height: 50 }}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Icon}
            onPress={() => {
              this._signIn();
            }}
          />
          <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>
            ---------------Sign In---------------
          </Text>
          <LoginButton
            style={{ width: 190, height: 40 }}
            readPermissions={["email", "user_birthday", "public_profile"]}
            onLoginFinished={(error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                this.props.onSigninFBorGG();
                this.props.navigation.navigate("HomeMap");
              }
            }}
            onLogoutFinished={() =>
              this.setState({
                type: 0,
                user: null
              })
            }
          />
        </View>
      );
    }

    if (this.props.types === 1) {
      return (
        <View style={styles.container}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: this.props.proFile.picture.data.url }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20
            }}
          >
            Welcome {this.props.proFile.name}
          </Text>
          <Text>Your email is: {this.props.proFile.email}</Text>
          <Text>Gender: {this.props.proFile.gender}</Text>
          <Text>Birthday: {this.props.proFile.birthday}</Text>
          <TouchableOpacity
            onPress={() => {
              this._signOut();
            }}
          >
            <View style={{ marginTop: 50 }}>
              <Image
                style={{ height: 40, width: 120 }}
                source={{ uri: "https://i.stack.imgur.com/I3NM6.png" }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    if (this.props.types === 2) {
      return (
        <View style={styles.container}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: this.props.proFile.picture.data.url }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20
            }}
          >
            Welcome {this.props.proFile.name}
          </Text>
          <Text>Your email is: {this.props.proFile.email}</Text>
          <Text>Gender: {this.props.proFile.gender}</Text>
          <Text>Birthday: {this.props.proFile.birthday}</Text>
          <View style={{ marginTop: 50 }}>
            <LoginButton
              style={{ height: 40, width: 120 }}
              onLogoutFinished={() => {
                this.props.onSignoutFBorGG();
                this.props.navigation.navigate("HomeMap");
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default LoginAnimation;
