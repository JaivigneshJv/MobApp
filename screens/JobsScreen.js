import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import DocumentPicker from "react-native-document-picker";

const JobsScreen = () => {
  const [resume, setResume] = useState(null);
  const onImportPress = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("user cancelled");
      } else {
        console.error(err);
      }
    }
  };

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
          flex: 0.14,
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
          Resume
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onImportPress();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-Light",
                fontSize: 17,
                marginTop: 20,
              }}
            >
              Upload your resume here
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "justify",
            padding: 20,
            fontFamily: "Poppins-Thin",
            fontSize: 15,
          }}
        >
          Our AI will analyze your resume and suggest you the best jobs
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({});
