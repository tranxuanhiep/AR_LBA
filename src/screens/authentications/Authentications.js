import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import AuthScreen from "../../components/authentications/index";
import Routers from "../../routers/Routers";
import SignInApi from "../../api/functionsApi/SignIn";
const FBSDK = require("react-native-fbsdk");
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import Axios from "axios";
const { LoginButton, AccessToken, LoginManager } = FBSDK;
export class LoginAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId:
          "121505823634-ecmbqk8qhgvoe60ctvvd7jofkt469i53.apps.googleusercontent.com",
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({ user });
    } catch (err) {
      console.log("Play services error", err.code, err.message);
    }
  }

 async _signIn() {
   await GoogleSignin.signIn()
      .then(user => {
        Axios.get(
          "https://www.googleapis.com/plus/v1/people/107648527285522717037?fields=birthday%2Cgender&key=AIzaSyB9lTSgPuDkJ51GNNvxv2sMZk9QUgmGxGo",
          null,
          { headers: { Authorization: user.accessToken } }
        ).then(Data => {
          console.log("ssss:  " + Data.birthday + "  " + Data.data.gender);
          this.setState({
            user: {
              user: user,
              birthday: Data.data.birthday,
              gender: Data.data.gender
            }
          });
        });
      })
      .catch(err => {
        console.log("WRONG SIGNIN", err);
      })
      .done();
  }
  async initUser(token) {
    await Axios.get(
      "https://graph.facebook.com/v2.5/me?fields=id,birthday,email,name,link,picture{url},gender,locale,cover,first_name,last_name&access_token=" +
        token
    ).then(json => console.log(json.data));
  }
  _signOut() {
    GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => {
        this.setState({ user: null });
      })
      .done();
  }
  render() {
    console.log(this.state.user);
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 120, height: 44 }}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Icon}
            onPress={() => {
              this._signIn();
            }}
          />
          <LoginButton
            readPermissions={["email", "user_birthday", "public_profile"]}
            onLoginFinished={(error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  const { accessToken } = data;
                  console.log("aaaa" + JSON.stringify(data));
                  this.initUser(accessToken);
                });
              }
            }}
            onLogoutFinished={() => alert("logout.")}
          />
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20
            }}
          >
            Welcome {this.state.user.name}
          </Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity
            onPress={() => {
              this._signOut();
            }}
          >
            <View style={{ marginTop: 50 }}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
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
