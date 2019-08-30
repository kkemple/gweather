import React from "react";
import Constants from "expo-constants";
import {
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Auth } from "aws-amplify";
import Colors from "../constants/Colors";

export default function SettingsScreen(props) {
  const { manifest = {} } = Constants;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={async () => {
          await Auth.signOut();
        }}
      >
        <Text style={styles.signOutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: "Settings",
  headerStyle: {
    backgroundColor: Colors.tabIconDefault
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: Colors.tintColor
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tabIconDefault,
    paddingBottom: 24,
    paddingHorizontal: 24,
    justifyContent: "space-between"
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row"
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2
  },
  nameText: {
    fontWeight: "600",
    fontSize: 18,
    color: Colors.tintColor
  },
  slugText: {
    color: Colors.tintColor,
    fontSize: 14,
    backgroundColor: "transparent"
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: Colors.tintColor
  },
  signOutButton: {
    marginTop: "auto",
    backgroundColor: Colors.tintColor,
    color: "#ffffff",
    borderRadius: 3,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  signOutButtonText: {
    color: "#ffffff"
  }
});
