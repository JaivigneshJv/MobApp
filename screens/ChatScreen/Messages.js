import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

import CommMaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Messages = () => {
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

  const handleNewChat = () => {
    // TODO: api to new chat with user
  };

  return (
    <View>
      <View
        style={{
          height: "100%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "white",
            borderWidth: 2,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={handleNewChat}>
            <CommMaterialIcon
              name="chat-plus-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({});
