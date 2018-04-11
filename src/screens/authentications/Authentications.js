import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import AuthScreen from "../../components/authentications/index";
import Routers from "../../routers/Routers";
import SignInApi from "../../api/functionsApi/SignIn";

export class LoginAnimation extends Component {
  state = {
    isLoggedIn: false,
    isLoading: false,
    isAppReady: false
  };
  _setIsloading = value => {
    this.setState({ isLoading: value });
  };

  _simulateLogin = (username, password) => {
    
  };
  CheckAccount = async () => {
    
  };
  componentDidMount() {
    this.CheckAccount();
  }
  componentDidUpdate() {
    this.CheckAccount();
  }
  render() {
    if (this.state.isAppReady) {
      return <View />;
    } else {
      return (
        <AuthScreen
          login={this._simulateLogin}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          setisLoading={this._setIsloading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
      );
    }
  }
}
export default LoginAnimation;
