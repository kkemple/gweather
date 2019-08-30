import React from "react";
import { Platform, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const getIoniconName = icon => {
  let name;
  if (/cloudy|fog/.test(icon)) {
    name = "cloudy";
  }

  if (/rain|sleet/.test(icon)) {
    name = "rainy";
  }

  if (/hail|snow/.test(icon)) {
    name = "snow";
  }

  if (/wind|tornado/.test(icon)) {
    name = "compass";
  }

  if (icon.includes("cloudy-day")) {
    name = "partly-sunny";
  }

  if (icon.includes("cloudy-night")) {
    name = "cloudy-night";
  }

  if (icon === "thunderstorm") {
    name = "thunderstorm";
  }

  if (icon === "clear-day") {
    name = "sunny";
  }

  if (icon === "clear-night") {
    name = "moon";
  }

  return `${Platform.OS === "ios" ? "ios-" : "md-"}${name}`;
};

export default props => (
  <View style={styles.container}>
    <View>
      <View style={styles.headerSection}>
        <Text style={styles.temp}>{`${props.weather.temperature}\u00B0`}</Text>
        <Ionicons
          size={96}
          color="#ffffff"
          name={getIoniconName(props.weather.icon)}
          style={{
            textShadowColor: "rgba(0, 0, 0, 0.5)",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 2
          }}
        />
      </View>
      {props.weather.temperature !== props.weather.feelsLike && (
        <Text style={[styles.feelsLike, { marginTop: -8, marginBottom: 8 }]}>
          {`Feels like ${props.weather.feelsLike}\u00B0`}
        </Text>
      )}
    </View>
    <Text style={styles.feelsLike}>
      {props.weather.current.summary} - {props.weather.hourly.summary}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 4
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  temp: {
    fontSize: 96,
    color: "#ffffff",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  feelsLike: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 24,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  }
});
