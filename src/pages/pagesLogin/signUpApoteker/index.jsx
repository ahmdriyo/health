import {
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import SvgLogin from "../../../assets/SvgLogin";
import { firebase, userRef } from "../../../../config";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import Buttons from "../../../components/Button/Index";
import TextInputs from "../../../components/TextInput";
import InputPassword from "../../../components/InputPassword";
import DropdownComponentExperience from "../../../components/DropdownExperience";
import DropdownComponentSpesialisApoteker from "../../../components/DropdownSpesialisApoteker";
import {
  alertEmailDuplicate,
  alertRegSuccessful,
  fieldError,
  invalidEmailError,
  minimumPasswordError,
  nameError,
} from "../../../customAlert";
const SignUpApoteker = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [spesialis, setSpesialis] = useState("");
  const [longExperience, setLongExperience] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("apoteker");
  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return;
  }
  const handleSpesialisSelect = (spesialis) => {
    setSpesialis(spesialis);
  };
  const handleExperienceSelect = (longExperience) => {
    setLongExperience(longExperience);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const registerUser = async (
    email,
    password,
    fullName,
    address,
    longExperience,
    spesialis
  ) => {
    if (fullName == "") {
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
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;
      await userRef.doc(userId).set({
        address,
        longExperience,
        spesialis,
        email,
        fullName,
        role,
        userId
      });
      navigation.navigate("Login");
      alertRegSuccessful();
      console.log("role anda :", role);
      console.log("id anda :", userId);
      console.log(
        "Pendaftaran berhasil:",
        fullName,
        email,
        address,
        longExperience,
        spesialis,
      );
    } catch (err) {
      if (
        err.message ===
        "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
      ) {
        alertEmailDuplicate();
        return;
      }
    }
  };
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
          <View style={{ marginBottom: -70, alignItems: "center" }}>
            <Text style={styles.text}>Hello Apoteker</Text>
            <Text style={styles.textSec}>Sign Up</Text>
          </View>
          <SvgLogin width="50%" height="50%" />
          <View style={styles.contenTextInput}>
            <TextInputs
              placeholder="Full Name"
              onChangeText={(fullName) => setFullName(fullName)}
            />
            <TextInputs
              placeholder="Full Address"
              onChangeText={(address) => setAddress(address)}
            />
            <DropdownComponentSpesialisApoteker
              onSelect={handleSpesialisSelect}
            />
            <DropdownComponentExperience onSelect={handleExperienceSelect} />
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
              registerUser(
                email,
                password,
                fullName,
                address,
                spesialis,
                longExperience
              );
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#82799D", marginRight: 5 }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#432C81" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUpApoteker;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  conten: {
    height: height + 50,
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
  contenTextInput: {
    width: "100%",
    alignItems: "center",
    marginTop: -75,
    marginBottom: 20,
  },
  textSec: {
    fontSize: 26,
    fontFamily: "Raleway_700Bold",
    color: "#432C81",
  },
});
