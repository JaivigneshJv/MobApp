import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { HOST_LINK } from "@env";

const ResumeScreen = () => {
  // console.log(HOST_LINK);

  const [jobsData, setJobsData] = useState([]);
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
  const url = HOST_LINK + "/jobfetch";
  axios.get(url).then((res) => {
    setJobsData(res.data);
  });

  const jobViews = jobsData.map((job) => {
    return (
      <View
        key={job._id}
        style={{
          margin: 5,
          borderRadius: 10,
          borderColor: "red",
          padding: 15,
          borderBlockColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 16,
          }}
        >
          {job.title}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
          }}
        >
          {job.company}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins-Italic",
            textAlign: "right",
            position: "relative",
            marginTop: -20,
          }}
        >
          Location: {job.location}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            marginTop: 10,
            fontSize: 12,
          }}
        >
          {job.description}
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "right",
              padding: 5,
              marginLeft: 10,
              fontSize: 12,
              fontFamily: "Poppins-Bold",
              color: "black",
            }}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  const applyJob = () => {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "85%",
          borderRadius: 20,
          backgroundColor: "grey",
          marginTop: 100,
          display: "none",
        }}
      ></View>
    );
  };

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
          Jobs
        </Text>
      </View>
      <ScrollView
        style={{
          height: 50,
        }}
      >
        <View
          style={{
            borderRadius: 10,
            borderColor: "black",
          }}
        >
          {jobViews}
        </View>
      </ScrollView>
      {applyJob() ? applyJob() : null}
    </SafeAreaView>
  );
};

export default ResumeScreen;

const styles = StyleSheet.create({});
