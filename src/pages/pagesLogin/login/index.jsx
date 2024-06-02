import {
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Dimensions,Alert } from "react-native";
import SvgLogin from "../../../assets/SvgLogin";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userRef } from "../../../../config";
import Buttons from "../../../components/Button/Index";
import TextInputs from "../../../components/TextInput";
import InputPassword from "../../../components/InputPassword";
import { alertInvalidCredential, fieldError, invalidEmailError,minimumPasswordError} from "../../../customAlert";
import { useAuth } from "../../../Auth/authContext";
import { getDoc, getDocs, query, where } from "firebase/firestore";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('')
  const {user,login} = useAuth();
  const [users, setUsers] = useState([''])

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginUsers = async () => {
    if (!email || !password) {
      fieldError();
      return;
    }
    if (!isValidEmail(email)) {
      invalidEmailError();
      return;
    }
    if (password.length < 6) {
      minimumPasswordError();
      return;
    }
    setLoading(true);
    try {
      const response = await login(email, password);
      setLoading(false);
      if (!response.success) {
        Alert.alert("Login", response.msg);
        return;
      }
      const userData = response.user;
      if (userData?.role === "user") {
        console.log("userData",userData)
        navigation.navigate("HomeUser");
      }

    } catch (err) {
      if (err.message === "Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).") {
        alertInvalidCredential()
      }
    }
  };
  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return 
  }
  return (
    <SafeAreaView style={styles.container}>
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
          { loading ? (
              <ActivityIndicator style={{margin:8}} size="large" color="#432C81" />
            ) : (
              <Buttons
            label="Login"
            color="#ffffff"
            bgColor="#432C81"
            fontFamily="Raleway_700Bold"
            onPress={() => loginUsers(email,password,role)}
          />
          )}
          
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
