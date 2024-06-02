import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView, 
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../../config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import Pesan from "./pesan";
import Artikel from "./artikel";
import Beranda from "./beranda";
import Nontifikasi from "./nontifikasi";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../Auth/authContext";

const BottomTabNavigator = createBottomTabNavigator();

const HomeUser = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const {logout,user} = useAuth();
  const [users, setUsers] = useState([''])
  useEffect(() => {
    console.log("User cek",user)
    if(user?.uid)
    getUsers()
  },[])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F9F8F8"
      />
      {loading ? (
        <Loading/>
      ) : (
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
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="notifications-on" size={24} color={focused ? "#0071ff" : "gray"} />
            ),
          }}
          name="Nontifikasi"
          component={Nontifikasi}
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
      )}
      
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
  tabContainer: {
    position: "absolute",
    width: "95%",
    borderRadius: 12,
    marginHorizontal:10,
    bottom: 20,
    backgroundColor: "white",
    height: 60,
  },
  label: {
    textTransform: "capitalize",
    fontSize: 12,
  },
});
