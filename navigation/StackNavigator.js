import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import ProfileScreen from "../screens/ProfileScreen";
import JobsScreen from "../screens/JobsScreen";
import ResumeScreen from "../screens/ResumeScreen";
import ChatScreen from "../screens/ChatScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Jobs"
          component={ResumeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="bookmarks" size={25} color="black" />
              ) : (
                <Ionicons name="bookmarks-outline" size={25} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Resume"
          component={JobsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="albums" size={25} color="black" />
              ) : (
                <Ionicons name="albums-outline" size={25} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home" size={25} color="black" />
              ) : (
                <Ionicons name="home-outline" size={25} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={ChatScreen}
          options={{
            tabBarShowLabel: false,
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="chatbox-sharp" size={23} color="black" />
              ) : (
                <Ionicons name="chatbox-outline" size={23} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarShowLabel: false,
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person-sharp" size={23} color="black" />
              ) : (
                <Ionicons name="person-outline" size={23} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
