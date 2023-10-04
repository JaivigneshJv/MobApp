import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ReactSVG from "../assets/images/react.svg";
import { useFonts } from "expo-font";
import { HOST_LINK } from "@env";

const HomeScreen = () => {
  const url = HOST_LINK+"/Main";
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Poppins-Italic": require("../assets/Fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../assets/Fonts/Poppins-Light.ttf"),
  });
  useEffect(() => {
    const FetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log(token);
        const tokensend = {
          token: token,
        };
        axios.post(url, tokensend).then((res) => {
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
          backgroundColor: "white",
          flex: 0.15,
          position: "fixed",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          borderBottomColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <ReactSVG
            width={50}
            height={50}
            style={{
              marginTop: 8,
              marginLeft: 20,
            }}
          ></ReactSVG>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
                marginLeft: 10,

                fontSize: 20,
              }}
            >
              Saveetha Engineering
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              College
            </Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: 100,
          }}
        >
          <Text
            style={{
              color: "black",
              marginTop: 20,
              marginLeft: 20,
              fontFamily: "Poppins-Italic",
            }}
          >
            Hello {userData.username}
          </Text>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 25,
              color: "black",
              marginLeft: 20,
              fontFamily: "Poppins-Light",
            }}
          >
            Find your perfect job
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: "rgba(0, 0, 0, 0.2)",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
          }}
        ></View>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 10,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          There are no post.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
