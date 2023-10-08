import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

const Alerts = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Italic": require("../../assets/Fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../../assets/Fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("../../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require("../../assets/Fonts/Poppins-Thin.ttf"),
    "Poppins-Black": require("../../assets/Fonts/Poppins-Black.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text
        style={{
          fontFamily: "Poppins-Italic",
          fontSize: 16,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        No Alerts!
      </Text>
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({});
