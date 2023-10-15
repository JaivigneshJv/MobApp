import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HOST_LINK } from "@env";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-web";
import { set } from "mongoose";

const url = HOST_LINK + "/Main";

const Contact = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Italic": require("../../assets/Fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../../assets/Fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("../../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require("../../assets/Fonts/Poppins-Thin.ttf"),
    "Poppins-Black": require("../../assets/Fonts/Poppins-Black.ttf"),
  });

  const [xperc, setXperc] = useState("");
  const [xiiperc, setXiiperc] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [formVisible, setFormVisible] = useState(true); // add state variable to control visibility of form
  console.log("TESTT" + xperc + xiiperc + cgpa);

  console.log(url);
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
        axios.post(url, tokensend).then((res) => {
          console.log(res);
          const email = res.data.email;
          const username = res.data.name;
          const rollno = res.data.regno;
          if (res.data.Xpercentage != 0) {
            setFormVisible(false);
            setXperc(res.data.Xpercentage);
            setXiiperc(res.data.XIIpercentage);
            setCgpa(res.data.cgpa);
          }
          console.log(email, username, rollno);
          setUserData({ email, username, rollno });
        });
      } catch (err) {
        console.log("error at checkLogin", err);
      }
    };
    FetchData();
  }, []);

  const handleSubmit = () => {
    console.log("text" + userData.username);
    console.log(xperc);
    console.log(xiiperc);
    console.log(cgpa);
    try {
      axios
        .post(HOST_LINK + "/updateUser", {
          name: userData.username,
          xscore: xperc,
          xiiscore: xiiperc,
          cgpa: cgpa,
        })
        .then((res) => {
          console.log(res);
          setFormVisible(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        alignItems: "left",
        backgroundColor: "white",
        padding: 20,
      }}
    >
      {formVisible && (
        <SafeAreaView>
          <View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                marginBottom: 20,
              }}
            >
              <View>
                <TextInput
                  value={xperc}
                  onChange={(e) => setXperc(e.nativeEvent.text)}
                  placeholder="X Percentage"
                  style={{
                    paddingVertical: 0,
                  }}
                  keyboardType="numeric"
                ></TextInput>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                marginBottom: 20,
              }}
            >
              <View>
                <TextInput
                  value={xiiperc}
                  onChange={(e) => setXiiperc(e.nativeEvent.text)}
                  placeholder="XII Percentage"
                  style={{
                    paddingVertical: 0,
                  }}
                  keyboardType="numeric"
                ></TextInput>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            }}
          >
            <View>
              <TextInput
                value={cgpa}
                onChange={(e) => setCgpa(e.nativeEvent.text)}
                placeholder="CGPA"
                style={{
                  paddingVertical: 0,
                }}
                keyboardType="numeric"
              ></TextInput>
            </View>
          </View>
          <Pressable onPress={handleSubmit}>
            <View
              style={{
                width: "100%",
                height: 40,
                marginTop: 30,
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins-Bold",
                }}
              >
                Submit
              </Text>
            </View>
          </Pressable>
        </SafeAreaView>
      )}
      {!formVisible && (
        <SafeAreaView>
          <View
            style={{
              width: "100%",
              height: "100%",
              borderWidth: 0.4,
              borderColor: "black",
              borderRadius: 10,
              justifyContent: "left",
              alignItems: "left",
              marginTop: -10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                margin: 20,
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Details
            </Text>

            <Text
              style={{
                fontFamily: "Poppins-Italic",
                marginLeft: 20,
              }}
            >
              X Percentage: {xperc}
              {"\n\n"}
              XII Percentage: {xiiperc}
              {"\n\n"}
              CGPA: {cgpa}
            </Text>

            <Pressable onPress={() => setFormVisible(true)}>
              <View
                style={{
                  margin: 20,
                  height: 40,
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins-Bold",
                  }}
                >
                  Edit
                </Text>
              </View>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </GestureHandlerRootView>
  );
};

export default Contact;

const styles = StyleSheet.create({});
