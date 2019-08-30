import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import WeatherCard from "../components/WeatherCard";
import bg from "../assets/images/bg.png";
import { weather as fetchWeather } from "../src/graphql/queries";

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);

  const getGeoLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") return;

    return Location.getCurrentPositionAsync({});
  };

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const geo = await getGeoLocation();

        const result = await API.graphql(
          graphqlOperation(fetchWeather, {
            lat: geo.coords.latitude,
            lon: geo.coords.longitude
          })
        );

        setWeather(result.data.weather);
      } catch (error) {
        console.log(error);
      }
    };

    loadWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={bg} style={styles.bg} />
      {weather && <WeatherCard weather={weather} />}
      {weather && <Image source={{ uri: weather.gif }} style={styles.gif} />}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#28235b",
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 64,
    justifyContent: "space-around"
  },
  bg: {
    position: "absolute",
    // flex: 1,
    resizeMode: "cover",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5
  },
  gif: {
    borderRadius: 4,
    resizeMode: "cover",
    height: 300
  }
});
