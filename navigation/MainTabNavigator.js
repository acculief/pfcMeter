import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import AddPfc from "../screens/AddPfc";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#BCBEE4",
          borderBottomWidth: 0,
          height: 40
        }
      }
    },
    AddPfc: {
      screen: AddPfc
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    config
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "ホーム",
  tabBarOptions: {
    activeTintColor: "#BCBEE4",
    inactiveTintColor: "#999999",
    style: {
      backgroundColor: "#f5f5f5",
      borderTopWidth: 0,
      shadowRadius: 2,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -1
      },
      shadowColor: "gray"
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-home"} />
  )
};

const AnalyticsStack = createStackNavigator(
  {
    Analytics: {
      screen: AnalyticsScreen,

      navigationOptions: {
        title: "月間データ",
        headerTitleStyle: {
          alignSelf: "center",
          fontSize: 18,
          fontWeight: "bold",
          color: "#666666"
        },
        headerStyle: {
          backgroundColor: "#BCBEE4",
          borderBottomWidth: 0,
          height: 40
        }
      }
    }
  },
  {
    config
  }
);

AnalyticsStack.navigationOptions = {
  tabBarLabel: "分析",
  tabBarOptions: {
    activeTintColor: "#BCBEE4",
    inactiveTintColor: "#999999",
    style: {
      backgroundColor: "#f5f5f5",
      borderTopWidth: 0,
      shadowRadius: 2,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -1
      },
      shadowColor: "gray"
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-analytics"} />
  )
};

const tabNavigator = createBottomTabNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: disableTabBarList(navigation)
    })
  },
  AnalyticsStack
});

const disableTabBarList = navigation => {
  let route = navigation.state.routes[navigation.state.index].routeName;
  if (["AddPfc"].includes(route)) {
    return false;
  } else if (navigation.state.index > 1) {
    return false;
  }
};

export default tabNavigator;
