import { StackNavigator, TabNavigator } from "react-navigation";
import React from "react";
import HomeMap from "../redux/containers/containerHomeMap";
import DetailStore from "../screens/details/DetailStore";
import DetailPromotion from "../screens/details/DetailPromotion";
import Authentications from "../screens/authentications/Authentications";
import Favorites from "../screens/favorites/Favorites";
import Searchs from "../screens/searchs/Searchs";
import HomeList from "../screens/homes/HomeList";
import Notifications from "../screens/notifications/Notifications";
import TabBar from "../redux/containers/containerTabbar";
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
      header: null
    }
  },
  DetailStore: {
    screen: DetailStore,
    navigationOptions: {
      header: null
    }
  },
  DetailPromotion: {
    screen: DetailPromotion,
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
  },
  DetailStore: {
    screen: DetailStore,
    navigationOptions: {
      header: null
    }
  },
  DetailPromotion: {
    screen: DetailPromotion,
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
  },
  DetailStore: {
    screen: DetailStore,
    navigationOptions: {
      header: null
    }
  },
  DetailPromotion: {
    screen: DetailPromotion,
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
  },
  DetailStore: {
    screen: DetailStore,
    navigationOptions: {
      header: null
    }
  },
  DetailPromotion: {
    screen: DetailPromotion,
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
