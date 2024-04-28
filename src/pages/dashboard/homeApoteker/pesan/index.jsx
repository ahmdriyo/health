import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../../../config";
import Buttons from "../../../../components/Button/Index";
import SvgLogins from "../../../../assets/SvgLogin"
import * as Updates from 'expo-updates';
const Pesan = ({ navigation }) => {
  const [name, setName] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const getData = await AsyncStorage.getItem('userData');
          const { fullName } = JSON.parse(getData);
          setName(fullName);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } 
    fetchUserData();
  }, []);
  console.log("name :",name)

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem('userData');
      setName(null)
      await Updates.reloadAsync();
      console.log("Logut Dokter Berhasil")
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View>
      <Text>Nama Pengguna: {name}</Text>
      <Text>Apoteker {name}</Text>
      <Buttons
        bgColor="red"
        label="Logout"
        onPress={handleLogout}
      />
    </View>
  );
};

export default Pesan;

const styles = StyleSheet.create({});
