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
const SignUpAs = ({navigation}) => {
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
      <View style={styles.conten}>
        <Text style={styles.text}>SignUp as</Text>
        <SvgLogin width="60%" height="60%" />
        <Buttons
        onPress={() => navigation.navigate('SignUpUser')}
          label="User/Pengguna"
          color="#ffffff"
          bgColor="#432C81"
          fontFamily="Raleway_700Bold"
        />
        <Buttons
        onPress={() => navigation.navigate('SignUpDokter')}
          label="Dokter"
          color="#ffffff"
          bgColor="#432C81"
          fontFamily="Raleway_700Bold"
        />
        <Buttons
        onPress={() => navigation.navigate('SignUpApoteker')}
          label="Apoteker"
          color="#ffffff"
          bgColor="#432C81"
          fontFamily="Raleway_700Bold"
        />
      </View>
    </SafeAreaView>
  );
};
export default SignUpAs;
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
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    color: "#432C81",
  },
});
