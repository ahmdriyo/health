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
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (user?.userId) {
      if (user?.role === "user") {
        navigation.navigate("HomeUser");
      }
      // console.log("ini data users", user.role);
    }else{
      navigation.navigate("SignIn");
    }
  }, [user?.userId]);

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
