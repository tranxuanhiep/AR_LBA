import React from "react";
import { Footer, FooterTab, Button, View, Icon } from "native-base";
import Colors from "../../colors/Colors";
import Styles from "../../stylesheets/StyleTabBar";

export default class TabBar extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab style={Styles.TabBar}>
          <Button
            vertical
            // active={this.props.navigationState.index === 0}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Icon name="home" />
          </Button>
          <Button
            vertical
            // active={this.props.navigationState.index === 3}
            onPress={() => this.props.navigation.navigate("Favorites")}
          >
            <Icon name="star" />
          </Button>
          <Button vertical onPress={() => {}}>
            <View style={Styles.CameraAR}>
              <Icon name="ios-camera" style={Styles.IconCamera} />
            </View>
          </Button>
          <Button
            vertical
            // active={this.props.navigationState.index === 3}
            onPress={() => this.props.navigation.navigate("Notifications")}
          >
            <Icon name="star" />
          </Button>
          <Button
            vertical
            // active={this.props.navigationState.index === 4}
            onPress={() => this.props.navigation.navigate("Authentications")}
          >
            <Icon active name="person" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
