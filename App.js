import { AppLoading } from "expo";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Amplify, { API, graphqlOperation, Hub } from "aws-amplify";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import { YellowBox } from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import amplifyConfig from "./aws-exports";
import Colors from "./constants/Colors";
import { user } from "./src/graphql/queries";

YellowBox.ignoreWarnings([
  "Possible Unhandled Promise Rejection",
  "Remote debugger"
]);

Amplify.configure(amplifyConfig);

const theme = {
  ...AmplifyTheme,
  ...StyleSheet.create({
    container: {
      ...AmplifyTheme.container,
      backgroundColor: Colors.tabIconDefault
    },
    button: {
      ...AmplifyTheme.button,
      backgroundColor: Colors.tintColor
    },
    buttonDisabled: {
      ...AmplifyTheme.buttonDisabled,
      backgroundColor: Colors.tintColor
    },
    sectionFooterLink: {
      ...AmplifyTheme.sectionFooterLink,
      color: Colors.tintColor
    },
    input: {
      ...AmplifyTheme.input,
      color: Colors.tintColor,
      borderColor: Colors.tintColor,
      fontWeight: "bold"
    },
    inputLabel: {
      ...AmplifyTheme.inputLabel,
      color: Colors.tintColor,
      fontWeight: "bold"
    },
    sectionHeaderText: {
      ...AmplifyTheme.sectionHeaderText,
      color: Colors.tintColor
    }
  })
};

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const onAuthEvent = async data => {
      const {
        payload: { event }
      } = data;

      if (event === "signOut") {
        props.onStateChange("signedOut", null);
      }
    };

    Hub.listen("auth", onAuthEvent);

    return () => Hub.remove("auth", onAuthEvent);
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default withAuthenticator(
  App,
  {
    usernameAttributes: "email",
    signUpConfig: {
      hiddenDefaults: ["phone_number"]
    }
  },
  null,
  null,
  theme
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#28235b"
  }
});
