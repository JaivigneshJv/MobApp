import { View, Text, Touchable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOST_LINK } from "@env";
import axios from "axios";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const ApplyScreen = ({ route }) => {
  const [xperc, setXperc] = useState("");
  const [xiiperc, setXiiperc] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [canapply, setCanApply] = useState(false);
  const checkcanapply = (a, b, c) => {
    if (a >= 75 && b >= 75 && c >= 8) {
      setCanApply(true);
    } else {
      setCanApply(false);
    }
  };
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const { job } = route.params;
  const [fontsLoaded] = useFonts({
    "Poppins-Italic": require("../../assets/Fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../../assets/Fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("../../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require("../../assets/Fonts/Poppins-Thin.ttf"),
    "Poppins-Black": require("../../assets/Fonts/Poppins-Black.ttf"),
    "Poppins-Medium": require("../../assets/Fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../../assets/Fonts/Poppins-Regular.ttf"),
  });
  const url = HOST_LINK + "/Main";
  useEffect(() => {
    const FetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log(token);
        const tokensend = {
          token: token,
        };
        axios.post(url, tokensend).then((res) => {
          console.log(res.data);
          const email = res.data.email;
          const username = res.data.name;
          const rollno = res.data.regno;
          const Xpercentage = res.data.Xpercentage;
          const XIIpercentage = res.data.XIIpercentage;
          const cgpa = res.data.cgpa;
          setXperc(res.data.Xpercentage);
          setXiiperc(res.data.XIIpercentage);
          setCgpa(res.data.cgpa);
          checkcanapply(Xpercentage, XIIpercentage, cgpa);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 10 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>
          <View style={{ flex: 0.15, backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                padding: 20,
                fontSize: 30,
                fontFamily: "Poppins-Bold",
              }}
            >
              {job.title}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: "100%",
              margin: 25,
              marginTop: 0,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 14,
                marginTop: -15,
              }}
            >
              {job.description}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 20,
                marginTop: 10,
              }}
            >
              {job.company}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Italic",
                fontSize: 16,
              }}
            >
              {job.location}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Italic",
                fontSize: 16,
              }}
            >
              {job.salary}
            </Text>
            <View
              style={{
                borderWidth: 0.4,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 20,
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
                Requirements
              </Text>
              {job.requirements.map((item) => {
                return (
                  <Text
                    style={{
                      fontFamily: "Poppins-Italic",
                      marginLeft: 20,
                    }}
                  >
                    {"-"} {item}
                  </Text>
                );
              })}
              <Text
                style={{
                  fontFamily: "Poppins-Italic",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                {"\n"}X Percentage: 75% {"(" + xperc + ")"}
                {"\n"}
                XII Percentage: 75% {"(" + xiiperc + ")"}
                {"\n"}
                CGPA: 8 {"(" + cgpa + ")"}
              </Text>
            </View>
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
                  Apply
                </Text>
              </View>
            </Pressable>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>
                {canapply ? (
                  <Text
                    style={{
                      fontFamily: "Poppins-Bold",
                      color: "green",
                    }}
                  >
                    You're profile is eligible for this job
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "Poppins-Bold",
                      color: "red",
                    }}
                  >
                    You're profile is not eligible for this job
                  </Text>
                )}
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              width: 100,
              justifyContent: "left",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Pressable
              style={{
                height: 40,
                backgroundColor: "black",
                borderWidth: 0.3,
                justifyContent: "center",
                borderRadius: 5,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins-Italic",
                  fontSize: 12,
                }}
              >
                {" "}
                Go Back{" "}
              </Text>
            </Pressable>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ApplyScreen;
