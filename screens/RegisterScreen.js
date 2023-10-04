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
import React, { useState } from "react";
import LoginSVG from "../assets/images/login.svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { HOST_LINK } from "@env";

const RegisterScreen = () => {
  console.log(HOST_LINK);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollno, setRollNo] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isRegistrationNumberValid = (regno) => {
    const regnoRegex = /^\d{12}$/;
    return regnoRegex.test(regno);
  };
  const url = HOST_LINK + "/register";
  const handleRegister = () => {
    if (!email || !password || !rollno || !username) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    if (username.length < 3) {
      Alert.alert(
        "Invalid Username",
        "Username must be at least 3 characters long"
      );
      return;
    }

    if (!isRegistrationNumberValid(rollno)) {
      Alert.alert(
        "Invalid Registration Number",
        "Registration number must be 12 digits long and contain only digits"
      );
      return;
    }

    const user = {
      email: email,
      name: username,
      password: password,
      regno: rollno,
    };

    axios
      .post(url, user)
      .then((res) => {
        console.log(res);
        Alert.alert(
          "Registered Successfully",
          "You have registered successfully, please verify your email to login"
        );
        setUsername("");
        setPassword("");
        setEmail("");
        setRollNo("");
        navigation.navigate("Login");
      })
      .catch((err) => {
        Alert.alert("Error", "Something went wrong, please try again later");
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
              Register
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
              onChangeText={(e) => setEmail(e)}
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
            <MaterialIcons
              name="person"
              size={20}
              color="black"
              style={{ marginRight: 5, marginTop: 4 }}
            />
            <TextInput
              value={username}
              onChangeText={(e) => setUsername(e)}
              placeholder="UserName"
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
              onChangeText={(e) => setPassword(e)}
              placeholder="Password"
              style={{
                flex: 1,
                paddingVertical: 0,
              }}
              secureTextEntry={true}
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
            <MaterialIcons
              name="confirmation-number"
              size={20}
              color="black"
              style={{ marginRight: 5, marginTop: 4 }}
            />
            <TextInput
              value={rollno}
              onChangeText={(e) => setRollNo(e)}
              placeholder="Registration Number"
              style={{
                flex: 1,
                paddingVertical: 0,
              }}
              keyboardType="email-address"
            />
          </View>
          <TouchableOpacity
            onPress={handleRegister}
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
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Already have an account? Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
