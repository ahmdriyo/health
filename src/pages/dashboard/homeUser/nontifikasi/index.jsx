import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Buttons from "../../../../components/Button/Index";
import * as Updates from 'expo-updates';
import { useAuth } from "../../../../Auth/authContext";
const Nontifikasi = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    await Updates.reloadAsync();
  };

  return (
    <View>
      {/* <Text>Nama Pengguna: {name}</Text>
      <Text>Dokter {name}</Text> */}
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