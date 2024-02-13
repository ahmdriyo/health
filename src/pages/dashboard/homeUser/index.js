import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../../config";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Pesan from "./pesan";
import Artikel from "./artikel";
import Beranda from "./beranda";

const Tab = createBottomTabNavigator();
const HomeUser = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#F9F8F8"
        translucent={true}
      />
      <Tab.Navigator>
        <Tab.Screen name="Pesan" component={Pesan} />
        <Tab.Screen name="Artikel" component={Artikel} />
        <Tab.Screen name="Beranda" component={Beranda} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});
