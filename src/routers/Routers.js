import { StackNavigator, TabNavigator } from "react-navigation";
import React from "react";
import HomeMap from "../redux/containers/containerHomeMap";
import Authentications from "../redux/containers/containerAuthenticatons";
import Favorites from "../redux/containers/containerFavorite";
import Searchs from "../redux/containers/containerSearch";
import HomeList from "../redux/containers/containerHomeList";
import Notifications from "../redux/containers/containerNotifications";
import TabBar from "../redux/containers/containerTabbar";
import DetailStore from "../redux/containers/containerDetailStore";
import PromotionsOfStore from "../redux/containers/containerPromotionsOfStore";

export const DetailStoreStack = StackNavigator({
  DetailStore: {
    screen: DetailStore,
    navigationOptions: {
      header: null
    }
  }
});

export const PromotionsOfStoreStack = StackNavigator({
  PromotionsOfStore: {
    screen: PromotionsOfStore,
    navigationOptions: {
      header: null
    }
  }
});

export const StoreTab = TabNavigator(
  {
    DetailStore: { screen: DetailStoreStack },
    PromotionsOfStore: { screen: PromotionsOfStoreStack }
  },
  {
    tabBarPosition: "top",
    swipeEnabled: false
  }
);

export const HomeStack = StackNavigator({
  HomeMap: {
    screen: HomeMap,
    navigationOptions: {
      header: null
    }
  },
  HomeList: {
    screen: HomeList,
    navigationOptions: {
      title: "Home List"
    }
  },
  StoreTab: {
    screen: StoreTab,
    navigationOptions: {
      header: null
    }
  }
});

export const SearchStack = StackNavigator({
  Searchs: {
    screen: Searchs,
    navigationOptions: {
      header: null
    }
  }
});

export const AuthenticationStack = StackNavigator({
  Authentications: {
    screen: Authentications,
    navigationOptions: {
      header: null
    }
  }
});

export const FavoriteStack = StackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      header: null
    }
  }
});

export const NotificationStack = StackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      header: null
    }
  }
});

export const HomeScreenRouter = TabNavigator(
  {
    Home: { screen: HomeStack },
    Favorites: { screen: FavoriteStack },
    Notifications: { screen: NotificationStack },
    Authentications: { screen: AuthenticationStack },
    Searchs: { screen: SearchStack }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarComponent: props => {
      return <TabBar {...props} />;
    }
  }
);

export default HomeScreenRouter;
