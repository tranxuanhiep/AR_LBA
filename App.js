import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import LoadData from "./src/redux/containers/containerLoadData";
import { PermissionsAndroid } from "react-native";
import allReducers from "./src/redux/reducers/allReducers";

let store = createStore(allReducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoadData />
      </Provider>
    );
  }
}
