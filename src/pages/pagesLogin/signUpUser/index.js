import {
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Dimensions, Alert } from "react-native";
import SvgLogin from "../../../assets/SvgLogin";
import { firebase } from "../../../../config";
import InputPassword from "../../../components/InputPassword";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import Buttons from "../../../components/Button/Index";
import TextInputs from "../../../components/TextInput";

const SignUpUser = ({ navigation }) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [role, setRole] = useState ("apotekers")

  registerUser = async (email, password, fullName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://health-fit-1d40d.firebaseapp.com",
          })
          .catch((err) => {
            alert(err.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                email,
                fullName,
                password,
                role,
              });
              console.log(email,fullName,password,role)
              // navigation.navigate("Login");
          })
          .catch((err) => {
            alert(err.message);
            console.log(err);
          });
      })
  };
  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle = "whait-content" hidden = {false} backgroundColor="transparent" translucent = {true}/> */}
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#F9F8F8"
        translucent={true}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.conten}>
          <Text style={styles.text}>Hello People</Text>
          <Text style={styles.textSec}>Sign Up</Text>
          <SvgLogin width="50%" height="50%" />
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 20,
              marginTop: -20,
            }}
          >
            <TextInputs
              placeholder="Full Name"
              onChangeText={(fullName) => setFullName(fullName)}
            />
            <TextInputs
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
            />
            <InputPassword
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <Buttons
            label="Sign Up"
            color="#ffffff"
            bgColor="#432C81"
            fontFamily="Raleway_700Bold"
            onPress={() => {
              if (password.length < 6) {
                Alert.alert(
                  "Error",
                  "Password harus memiliki minimal 6 karakter."
                );
              }else {
                registerUser(email, password, fullName)
                .then(() => {
                  navigation.navigate("Login")
                  // Jika tidak ada kesalahan dari registerUser
                  Alert.alert(
                    "Registrasi Berhasil",
                    "Email Anda telah dibuat. Silakan login kembali.",
                    [
                      {
                        text: "OK",
                        onPress: () => navigation.navigate("Login"),
                      },
                    ]
                  );
                })
                .catch((err) => {
                  if (
                    err.message ===
                    "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
                  ) {
                    Alert.alert(
                      "Error",
                      "Email Duplikat, Silahkan masukan Email yang berbeda",
                      [
                        {
                          text: "OK",
                        },
                      ]
                    );
                  } 
                });
              } 
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#82799D", marginRight: 5 }}>
              Already have an account?
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "#432C81" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUpUser;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  conten: {
    height: height - 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  text: {
    fontSize: 22,
    fontFamily: "Raleway_700Bold",
    color: "#432C81",
  },
  textSec: {
    fontSize: 26,
    fontFamily: "Raleway_700Bold",
    color: "#432C81",
    marginBottom: -20,
  },
});
