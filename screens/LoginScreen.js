import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoginSVG from "../assets/images/login.svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { HOST_LINK } from "@env";

const LoginScreen = () => {
  // console.log(HOST_LINK);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.navigate("Main");
        }
      } catch (err) {
        console.log("error at checkLogin", err);
      }
    };
    checkLoginStatus();
  }, []);
  const url = HOST_LINK + "/login";

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post(url, user)
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.navigate("Main");
      })
      .catch((err) => {
        Alert.alert("Login Error", "Invalid Credentials");
        console.log(err);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          paddingHorizontal: 25,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <LoginSVG width={300} height={300} />
        </View>
        <KeyboardAvoidingView>
          <View>
            <Text
              style={{
                fontSize: 28,
                marginTop: 10,
                fontWeight: "500",
                color: "black",
                marginBottom: 30,
              }}
            >
              Login
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="black"
              style={{ marginRight: 5, marginTop: 4 }}
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              style={{
                flex: 1,
                paddingVertical: 0,
              }}
              keyboardType="email-address"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="black"
              style={{ marginRight: 5 }}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              style={{
                flex: 1,
                paddingVertical: 0,
              }}
              secureTextEntry={true}
            />

            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  color: "rgb(119	223	250)",
                  fontWeight: "700",
                }}
              >
                Forgot?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "rgb(119	223	250)",
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
              fontWeight: "500",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 16,
                color: "white",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>New User? Sign Up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
