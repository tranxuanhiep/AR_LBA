import React, { Component } from "react";
import { AppRegistry } from "react-native";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import LoadData from "./src/redux/containers/containerLoadData";
import allReducers from "./src/redux/reducers/allReducers";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./src/redux/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
console.disableYellowBox = true;
const App = () => (
  <Provider store={store}>
    <LoadData />
  </Provider>
);
sagaMiddleware.run(rootSaga);
AppRegistry.registerComponent("AR_LBA", () => App);
