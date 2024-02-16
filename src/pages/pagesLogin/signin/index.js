import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import SvgLogin from "../../../assets/SvgLogin";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import Buttons from "../../../components/Button/Index";
const SignIn = ({ navigation }) => {
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
      <View style={styles.conten}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.textSec}>Health Fit</Text>
        <SvgLogin width="60%" height="60%" />
        <Buttons
          label="Sign Up"
          color="#ffffff"
          bgColor="#432C81"
          fontFamily="Raleway_700Bold"
          onPress={() => navigation.navigate("SignUpAs")}
        />
        <Buttons
          label="Login"
          bgColor="#ffffff"
          fontFamily="Raleway_700Bold"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  conten: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 19,
    fontFamily: "Raleway_700Bold",
    marginBottom: 5,
    color: "#432C81",
  },
  textSec: {
    fontSize: 28,
    fontFamily: "Raleway_700Bold",
    color: "#432C81",
  },
});
