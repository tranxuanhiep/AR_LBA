import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import HomeMap from '../redux/containers/containerHomeMap'
import Routers from '../routers/Routers'
export default class Main extends Component {
  render() {
    return <Routers />;
  }
}

