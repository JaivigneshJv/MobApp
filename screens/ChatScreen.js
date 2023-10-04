import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Alerts from "./ChatScreen/Alerts";
import Messages from "./ChatScreen/Messages";

const Tab = createMaterialTopTabNavigator();

const ChatScreen = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Italic": require("../assets/Fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../assets/Fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require("../assets/Fonts/Poppins-Thin.ttf"),
    "Poppins-Black": require("../assets/Fonts/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 10 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 0.12,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            marginTop: 20,
            marginLeft: 20,
            fontSize: 30,
            fontFamily: "Poppins-Bold",
          }}
        >
          Notifications
        </Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontFamily: "Poppins-Black" },
        }}
        style={{ backgroundColor: "grey" }}
      >
        <Tab.Screen name="Alerts" component={Alerts} />
        <Tab.Screen name="Messages" component={Messages} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
