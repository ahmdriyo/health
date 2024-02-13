import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../../../config";
import Buttons from "../../../../components/Button/Index";

const Pesan = ({ navigation }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        try {
          const snapshot = await firebase.firestore().collection("users").doc(user.uid).get();
          if (snapshot.exists) {
            const fullName = snapshot.data().fullName;
            setName(fullName);
            await AsyncStorage.setItem('userName', fullName);
          } else {
            console.log("Data pengguna tidak ditemukan");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } 
    };
    const retrieveData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName'); // Mendapatkan nama pengguna dari AsyncStorage
        if (storedName !== null) {
          setName(storedName);
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
    retrieveData();
    fetchUserData();
  }, []);
  console.log("namepesan")
  console.log(name)

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userData');
      navigation.navigate("StackLogin");
      console.log("lo")
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <View>
      <Text>Nama Pengguna: {name}</Text>
      <TouchableOpacity
        onPress={handleLogout}
      >
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pesan;

const styles = StyleSheet.create({});
