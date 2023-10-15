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
import { useFonts } from "expo-font";
import * as DocumentPicker from "expo-document-picker";
import { HOST_LINK, HOST_LINK_DS } from "@env";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";

const JobsScreen = () => {
  const urll = HOST_LINK_DS;
  // console.log(HOST_LINK);
  const url = HOST_LINK + "/Main";
  const [userData, setUserData] = useState({});

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
      }
    };
    FetchData();
  }, []);

  const [resume, setResume] = useState(null);

  const setDataForm = async (dataa) => {
    const data = {
      resume_path: "src/data/test/" + dataa,
      type: "lda",
      model_name: "model",
    };
    try {
      const requesturl1 = HOST_LINK_DS + "/rate_resume";
      axios.post(requesturl1, data).then((res) => {
        console.log(res.data);
        setResume(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const putData = async (formdataa) => {
    try {
      const requesturl = HOST_LINK_DS + "/upload_resume";
      const response = await axios.post(requesturl, formdataa, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("File uploaded successfully. Filename:", data.filename);
        setDataForm(userData.username + ".pdf");
      } else {
        console.error("File upload failed. Status:", response.status);
        console.error("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };
  const onImportPress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      const formData = new FormData();

      formData.append("file", {
        uri: result.assets[0].uri,
        type: "application/pdf",
        name: userData.username + ".pdf", //userData.username + ".pdf"
      });
      putData(formData);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        console.log(error);
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
          flex: 0.1,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            padding: 20,
            fontSize: 30,
            fontFamily: "Poppins-Bold",
          }}
        >
          Resume
        </Text>
      </View>
      <View
        style={{
          flex: 0.86,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onImportPress();
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                width: 300,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Light",
                  color: "white",
                  fontSize: 17,
                }}
              >
                Upload your resume here
              </Text>
            </View>
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
        <ScrollView>
          {resume && (
            <View
              style={{
                margin: 20,
                padding: 20,
                flexWrap: "wrap",
                borderBlockColor: "black",
                backgroundColor: "white",
                borderWidth: 0.2,
                borderRadius: 10,
                borderRadius: 10,
              }}
            >
              <Text>
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Bold",
                      fontSize: 25,
                    }}
                  >
                    Info
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      width: 300,
                      fontFamily: "Poppins-Light",
                    }}
                  >
                    <Text>
                      Education :{"\n"}
                      {resume[1].info.Education.map((item, index) => (
                        <Text>
                          {"-"}
                          {item}
                          {"\n"}
                        </Text>
                      ))}
                    </Text>
                    <Text>
                      {"\n"}
                      Skills:{"\n"}
                      {resume[1].info.skills.map((item, index) => (
                        <Text key={index}>
                          {item}
                          {", "}
                        </Text>
                      ))}
                    </Text>
                  </Text>

                  {/* <RatingBar
                  initialRating={3.5}
                  direction="horizontal"
                  allowHalfRating
                  itemCount={5}
                  itemPadding={4}
                  ratingElement={{
                    full: <Ionicons name="star" color="#54D3C2" size={40} />,
                    half: (
                      <Ionicons name="star-half" color="#54D3C2" size={40} />
                    ),
                    empty: (
                      <Ionicons name="star-outline" color="#54D3C2" size={40} />
                    ),
                  }}
                  onRatingUpdate={(value) => console.log(value)}
                /> */}

                  <Text
                    style={{
                      padding: 10,
                      fontFamily: "Poppins-Black",
                      fontSize: 16,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Rating : {resume[0].rating}
                  </Text>
                  {/* <Rating
                  type="star"
                  startingValue={resume[0].rating}
                  ratingCount={10}
                  imageSize={12}
                  showRating
                  onFinishRating={this.ratingCompleted}
                /> */}
                  <View>
                    <Progress.Bar
                      progress={resume[0].rating / 10}
                      width={300}
                      style={{
                        marginRight: 20,
                      }}
                      color="black"
                    />
                  </View>
                  <Text
                    style={{
                      width: 300,
                      fontFamily: "Poppins-Italic",
                      fontSize: 12,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    {resume[2].curated}
                  </Text>
                </View>
              </Text>

              <TouchableOpacity onPress={() => setResume(null)}>
                <View
                  style={{
                    width: "100%",
                    height: 40,
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
                    Clear
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({});
