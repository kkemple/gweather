import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import ForecastScreen from "../screens/ForecastScreen";
import SettingsScreen from "../screens/SettingsScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const ForecastStack = createStackNavigator(
  {
    Forecast: ForecastScreen
  },
  config
);

ForecastStack.navigationOptions = {
  tabBarLabel: "Forecast",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-partly-sunny" : "md-partly-sunny"}
    />
  )
};

ForecastStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    ForecastStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#ff2184",
      inactiveTintColor: "#ffffff",
      style: {
        backgroundColor: "#28235b"
      }
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
