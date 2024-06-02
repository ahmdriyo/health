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
import * as Updates from 'expo-updates';
import { useAuth } from "../../../../Auth/authContext";
const Nontifikasi = () => {
  const [name, setName] = useState(null);
  const { user, logout } = useAuth();
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
    await logout();
    await Updates.reloadAsync();
    // try {
    //   await AsyncStorage.removeItem('userData');
    //   setName(null)
    //   await Updates.reloadAsync();
    //   console.log("Logut Dokter Berhasil")
    // } catch (error) {
    //   console.error("Error during logout:", error);
    // }
  };

  return (
    <View>
      <Text>Nama Pengguna: {name}</Text>
      <Text>Dokter {name}</Text>
      <Buttons
        bgColor="red"
        label="Logout"
        onPress={handleLogout}
      />
    </View>
  );
};

export default Nontifikasi

const styles = StyleSheet.create({})