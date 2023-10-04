import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HOST_LINK } from "@env";

const url = HOST_LINK+ "/jobfetch";
const Contact = () => {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  useEffect(() => {
    const FetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log(token);
        const tokensend = {
          token: token,
        };
        axios
          .post(url, tokensend)
          .then((res) => {
            console.log(res);
            const email = res.data.email;
            const username = res.data.name;
            const rollno = res.data.regno;
            console.log(email, username, rollno);
            setUserData({ email, username, rollno });
          });
      } catch (err) {
        console.log("error at checkLogin", err);
        navigation.navigate("Login");
      }
    };
    FetchData();
  }, []);

  return (
    <View>
      <Text>{userData.email}</Text>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({});
