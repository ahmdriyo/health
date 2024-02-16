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
import { Dimensions,Alert } from "react-native";
import SvgLogin from "../../../assets/SvgLogin";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from "../../../../config";
import Buttons from "../../../components/Button/Index";
import TextInputs from "../../../components/TextInput";
import InputPassword from "../../../components/InputPassword";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const logins = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const userData = userCredential.user;
      // Fetch user role based on email from Firestore
      const userDoc = await firebase.firestore().collection('users').where('email', '==', email).get();
      if (!userDoc.empty) {
        userDoc.forEach(doc => {
          const userRole = doc.data().role;
          // Save user role to AsyncStorage
          AsyncStorage.setItem('userRole', userRole);
        });
      }
      // Save user data to AsyncStorage
      AsyncStorage.setItem('userData', JSON.stringify(userData));
      // Navigate user based on their role
      navigateUserBasedOnRole();
    } catch (err) {
      if (err.message === "Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).") {
        Alert.alert(
          "Error",
          "Email dan password yang Anda masukkan salah atau belum terdaftar, Silahkan periksa kembali email yang Anda masukkan",
          [
            {
              text: "OK",
            },
          ]
        );
      }
    }
  };

  const navigateUserBasedOnRole = async () => {
    try {
      const userRole = await AsyncStorage.getItem('userRole');
      if (userRole === 'dokters') {
        navigation.navigate("HomeDokter");
      } else if (userRole === 'users') {
        navigation.navigate("HomeUser");
      } else if (userRole === 'apotekers') {
        navigation.navigate("HomeApoteker");
      } 
    } catch (error) {
      console.error('Error navigating user based on role:', error);
    }
  };
  //   try {
  //     await firebase.auth().signInWithEmailAndPassword(email, password);
  //     await AsyncStorage.setItem('userData', JSON.stringify(email));
  //     navigation.navigate("HomeUser");
  //   } catch (err) {
  //     if (err.message === "Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).") {
  //       Alert.alert(
  //         "Error",
  //         "Email dan password yang Anda masukan salah atau belum terdaftar, Silahkan periksa kembali email yang anda masukkan",
  //         [
  //           {
  //             text: "OK",
  //           },
  //         ]
  //       );
  //     }
  //   }
  // };
  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return 
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
          <Text style={styles.text}>Welcome Back</Text>
          <Text style={styles.textSec}>Login</Text>
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
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
            />
            <InputPassword
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
            />
            <View style={{ width: "73%" }}>
              <TouchableOpacity>
                <Text style={{ color: "#432C81" }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Buttons
            label="Login"
            color="#ffffff"
            bgColor="#432C81"
            fontFamily="Raleway_700Bold"
            onPress={() => logins(email,password)}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#82799D", marginRight: 5 }}>
              Dont have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "#432C81" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Login;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  conten: {
    height:height -25,
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
    marginTop: 20,
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
