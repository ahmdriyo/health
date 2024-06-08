import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/authContext";
import { useNavigation } from "@react-navigation/native";
import { Splash } from "../../assets";

const SplashScreen = () => {
  const {isAuthenticated } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if(isAuthenticated) {
      navigation.navigate("HomeUser");
    } else if (isAuthenticated == false) {
      navigation.navigate("SignIn");
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={Splash} style={{ flex: 1,justifyContent:"center"}}>
        <ActivityIndicator style={{marginTop:520}} size={"large"} color={"blue"} /> 
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
