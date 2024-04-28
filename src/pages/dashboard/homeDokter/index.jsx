import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../../config";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Artikel from "./artikel";
import { MaterialIcons } from "@expo/vector-icons";
import Pesan from "./pesan";
import Beranda from "./beranda";

const BottomTabNavigator = createBottomTabNavigator();
const HomeDokter = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F9F8F8"
      />
      <BottomTabNavigator.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.label,
          tabBarStyle: [styles.tabContainer],
          tabBarItemStyle: {
            marginBottom: 7,
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#0071ff",
        }}
        safeAreaInsets={{
          bottom: 0,
        }}
      >
        <BottomTabNavigator.Screen
          name="Beranda"
          component={Beranda}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={23}
                color={focused ? "#0071ff" : "gray"}
              />
            ),
          }}
        />
        <BottomTabNavigator.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="message1"
                size={23}
                color={focused ? "#0071ff" : "gray"}
              />
            ),
          }}
          name="Pesan"
          component={Pesan}
        />
        <BottomTabNavigator.Screen
          name="Artikel"
          component={Artikel}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="article"
                size={23}
                color={focused ? "#0071ff" : "gray"}
              />
            ),
          }}
        />
      </BottomTabNavigator.Navigator>
    </SafeAreaView>
  );
};

export default HomeDokter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  tabContainer: {
    position: "absolute",
    width: "90%",
    borderRadius: 12,
    left: "5%",
    bottom: 20,
    backgroundColor: "white",
    height: 60,
  },
  label: {
    textTransform: "capitalize",
    fontSize: 12,
  },
});
