import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ReactSVG from "../assets/images/react.svg";
import { useFonts } from "expo-font";
import { HOST_LINK } from "@env";
import moment, { max } from "moment";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const url = HOST_LINK;
  const [feed, setFeed] = useState([]);
  const [newPost, setNewPost] = useState("");
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
        axios.post(url + "/Main", tokensend).then((res) => {
          console.log(res);
          const email = res.data.email;
          const username = res.data.name;
          const rollno = res.data.regno;
          console.log(email, username, rollno);
          setUserData({ email, username, rollno });
        });
        axios.get(url + "/feedfetch").then((res) => {
          console.log(res.data);
          setFeed(res.data);
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

  const post = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const res = await axios.post(url + "/feed", {
        name: userData.username,
        description: newPost,
        token: token,
      });
      console.log(res.data);

      axios.get(url + "/feedfetch").then((res) => {
        console.log(res.data);
        setFeed(res.data);
      });
    } catch (err) {
      console.log("error at posting", err);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 10 : 0,
          backgroundColor: "white",
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: "white",
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
          <View>
            <View
              style={{
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
            <View
              style={{
                marginTop: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TextInput
                  onChangeText={(text) => {
                    setNewPost(text);
                  }}
                  style={{
                    width: "75%",
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    padding: 10,
                  }}
                  placeholder="What's on your mind?"
                ></TextInput>

                <TouchableOpacity
                  onPress={() => {
                    post();
                  }}
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0.3,
                      topMargin: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 40,
                      backgroundColor: "black",
                    }}
                  >
                    <Text
                      style={{
                        padding: 5,
                        fontSize: 12,
                        fontFamily: "Poppins-Bold",
                        color: "white",
                      }}
                    >
                      Post
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              {feed.length == 0 ? (
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
                  There are no posts.
                </Text>
              ) : (
                <View>
                  {feed.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          borderWidth: 0.3,
                          borderRadius: 10,
                          margin: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins-Light",
                            fontSize: 20,
                            textAlign: "left",
                            marginLeft: 10,
                            flexDirection: "row",
                          }}
                        >
                          {item.name + ","}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins-Italic",
                            fontSize: 20,
                            textAlign: "center",
                          }}
                        >
                          {item.description}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins-Light",
                            fontSize: 10,
                            textAlign: "right",
                            marginRight: 10,
                          }}
                        >
                          {moment(item.createdAt).fromNow()}
                          {/* {item.name == userData.username ? (
                            <View style={{
                              borderWidth: 0.3,
                            }}>
                              <Ionicons
                                style={{ marginLeft: 10 }}
                                name="trash-outline"
                                size={15}
                                color="black"
                                onPress={() => {}}
                              />
                            </View>
                          ) : (
                            <View></View>
                          )} */}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
