import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  AsyncStorage
} from "react-native";
import getProfileSigninWithFacebook from "../../api/functionsApi/getProfileSigninWithFacebook";
import getProfileSigninWithGoogle from "../../api/functionsApi/getProfileSigninWithGoogle";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import SignUp from "../../api/functionsApi/SignUp";
const FBSDK = require("react-native-fbsdk");
const { LoginButton, AccessToken, LoginManager } = FBSDK;

export class LoginAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, type: 0 };
  }

  componentDidMount() {
    this._setupSignin();
  }

  async _setupSignin() {
    try {
      AccessToken.getCurrentAccessToken().then(data => {
        if (data != null) this.LoadDataFacebook(data.accessToken);
      });
    } catch (err) {
      console.log("Play services error", err.code, err.message);
    }
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId:
          "121505823634-ecmbqk8qhgvoe60ctvvd7jofkt469i53.apps.googleusercontent.com",
        offlineAccess: false
      });
      const user = await GoogleSignin.currentUserAsync();
      getProfileSigninWithGoogle(user.accessToken)
        .then(Data => {
          this.setState({
            type: 1,
            user: {
              id: user.id,
              name: user.name,
              birthday: Data.data.birthday,
              gender: Data.data.gender,
              email: user.email,
              first_name: user.familyName,
              last_name: user.givenName,
              picture: { data: { url: user.photo } }
            }
          });
        })
        .catch(error => console.log(error));
    } catch (err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  async _signIn() {
    console.log("Signin google");
    await GoogleSignin.signIn()
      .then(user => {
        getProfileSigninWithGoogle(user.accessToken).then(Data => {
          this.setState({
            type: 1,
            user: {
              id: user.id,
              name: user.name,
              birthday: Data.data.birthday,
              gender: Data.data.gender,
              email: user.email,
              first_name: user.familyName,
              last_name: user.givenName,
              picture: { data: { url: user.photo } }
            }
          });
          const gender = Data.data.gender == "male" ? 1 : 0;
          SignUp(
            user.id,
            user.email,
            user.familyName,
            user.givenName,
            Data.data.birthday,
            gender
          ).catch(error => {
            console.log(error);
          });
          AsyncStorage.setItem("@UserName", user.id);
        });
      })
      .catch(err => {
        console.log("WRONG SIGNIN", err);
      })
      .catch(error => console.log(error));
  }
  SignFacebook(token) {
    getProfileSigninWithFacebook(token)
      .then(Data => {
        this.setState({ type: 2, user: Data.data });
        const gender = Data.data.gender == "male" ? 1 : 0;
        SignUp(
          Data.data.id,
          Data.data.email,
          Data.data.first_name,
          Data.data.last_name,
          Data.data.birthday,
          gender
        )
          .then(Data => console.log(Data.data))
          .catch(error => {
            console.log(error);
          });
        AsyncStorage.setItem("@UserName", Data.data.id);
      })
      .catch(error => {
        console.log(error);
      });
  }
  LoadDataFacebook(token) {
    getProfileSigninWithFacebook(token)
      .then(Data => this.setState({ type: 2, user: Data.data }))
      .catch(error => {
        console.log(error);
      });
  }
  _signOut() {
    GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => {
        this.setState({ type: 0, user: null });
      })
      .catch(error => console.log(error))
      .done();
    AsyncStorage.removeItem("@UserName");
  }
  render() {
    console.log(this.state.user);
    if (this.state.type === 0) {
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
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontWeight: "bold"
            }}
          >
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
                AccessToken.getCurrentAccessToken().then(data => {
                  const { accessToken } = data;
                  this.SignFacebook(accessToken);
                });
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

    if (this.state.type === 1) {
      return (
        <View style={styles.container}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: this.state.user.picture.data.url }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
            Welcome {this.state.user.name}
          </Text>
          <Text>Your email is: {this.state.user.email}</Text>
          <Text>Gender: {this.state.user.gender}</Text>
          <Text>Birthday: {this.state.user.birthday}</Text>
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
    if (this.state.type === 2) {
      return (
        <View style={styles.container}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: this.state.user.picture.data.url }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
            Welcome {this.state.user.name}
          </Text>
          <Text>Your email is: {this.state.user.email}</Text>
          <Text>Gender: {this.state.user.gender}</Text>
          <Text>Birthday: {this.state.user.birthday}</Text>
          <View style={{ marginTop: 50 }}>
            <LoginButton
              style={{ height: 40, width: 120 }}
              onLogoutFinished={() => {
                AsyncStorage.removeItem("@UserName");
                this.setState({ type: 0, user: null });
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
