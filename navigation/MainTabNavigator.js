import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
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

HomeStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  {
    headerMode: "none",
    config
  }
);

LinksStack.navigationOptions = {
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

LinksStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "設定",
  tabBarOptions: {
    activeTintColor: "#000",
    inactiveTintColor: "#fff"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-settings"} />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack
  },
  {
    tabBarStyle: {
      backgroundColor: "red"
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
