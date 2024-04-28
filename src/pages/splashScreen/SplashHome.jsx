import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import SvgSplash from "../../assets/Splash";
import { Splash } from "../../assets/Image"



const SplashHome = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("StackHome");
    }, 3000);
  });
  return (
    // <SvgSplash width="100%" height="100%"/>
    <ImageBackground source={Splash} style={styles.background}></ImageBackground>
  );
};

export default SplashHome;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3DD4F5",
  },
});
