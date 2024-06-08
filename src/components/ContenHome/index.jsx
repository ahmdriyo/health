import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Apoteker from "../../pages/dashboard/homeUser/beranda/Apoteker";
import Dokter from "../../pages/dashboard/homeUser/beranda/Dokter";
import { SvgHeart } from "../../assets";
const Tab = createMaterialTopTabNavigator();
const ContenHome = () => {
  return (
    <View style={styles.conten}>
      <View style={styles.headerList}>
        <View>
          <SvgHeart width={90} height={60} />
        </View>
        <View style={{ marginLeft: 10, width: 220, marginVertical: 10 }}>
          <Text style={{ fontWeight: "600" }}>Konsultasi</Text>
          <Text style={{ fontSize: 12 }}>Chat dengan dokter dan apoteker</Text>
        </View>
      </View>
      <View style={styles.contenList}>
        <Tab.Navigator>
          <Tab.Screen
            name="Apoteker"
            component={Apoteker}
          />
          <Tab.Screen
            name="Dokter"
            component={Dokter}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default ContenHome;
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  conten: {
    flex: 1,
    width: "85%",
    height:height -90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#f1f1f1",
    borderRadius: 20,
    marginVertical:75,
    marginTop:90
  },
  headerList: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 15,
    marginBottom:-50
    
  },
  contenList: {
    flex: 1,
    width: "100%",
    borderTopWidth: 2,
    backgroundColor:"#ffffff",
    marginTop: -290,
    borderColor: "#cecece",
  },
});
