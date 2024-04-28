import {
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Dimensions, Alert } from "react-native";
import SvgLogin from "../../../assets/SvgLogin";
import { firebase, userRef } from "../../../../config";
import InputPassword from "../../../components/InputPassword";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import Buttons from "../../../components/Button/Index";
import TextInputs from "../../../components/TextInput";
import {
  alertEmailDuplicate,
  alertRegSuccessful,
  invalidEmailError,
  minimumPasswordError,
  fieldError,
  nameError
} from "../../../customAlert";
import LoadingButton from "../../../components/LoadingButton";

const SignUpUser = ({ navigation }) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState();
  const [role, setRole] = useState("user");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const registerUser = async (email, password, fullName) => {
    if(fullName == ""){
      nameError();
      return;
    }
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
    setLoading(true)
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;
      await userRef.doc(userId).set({
        email,
        fullName,
        role,
      });
      setLoading(false)
      navigation.navigate("Login");
      alertRegSuccessful();
      console.log("role anda :", role);
      console.log("id anda :", userId);
      console.log("Pendaftaran berhasil:", email, fullName);
    } catch (err) {
      setLoading(false)
      if ( err.message === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
        alertEmailDuplicate();
        setLoading(false)
        return;
      }
    }
  };
  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return;
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
          {loading ? (
            <LoadingButton/>
          ):(
            <Buttons
            label="Sign Up"
            color="#ffffff"
            bgColor="#432C81"
            fontFamily="Raleway_700Bold"
            onPress={() => {
              registerUser(email, password, fullName);
            }}
          />
          )}
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
