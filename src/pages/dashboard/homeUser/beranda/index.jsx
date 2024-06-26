import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import SvgIconHealth from "../../../../assets/Image/Icon/IconHealth";
import SvgProfile from "../../../../assets/Image/Icon/Profile";
import { bgHeader } from "../../../../assets";
import Conten from "./Conten";
import { useAuth } from "../../../../Auth/authContext";
import ContenHome from "../../../../components/ContenHome";
import { useNavigation } from "@react-navigation/native";

export default function Beranda () {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Izin akses lokasi ditolak");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      (async () => {
        try {
          const address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          if (address && address.length > 0) {
            setCity(address[0].city);
          }
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      })();
    }
  }, [location]);

  const handlePorfile = () => {
    navigation.navigate("Profile")
  }
 
  let text = (
    <>
      <ActivityIndicator style={{ margin: 8 }} size="small" color="#432C81" />
      <Ionicons name="location-sharp" size={16} color="black" />
    </>
  );
  if (errorMsg) {
    text = errorMsg;
  } else if (city) {
    text = (
      <>
        {city} <Ionicons name="location-sharp" size={16} color="black" />
      </>
    );
  }
  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground source={bgHeader} style={styles.headerImg}>
        <View style={styles.header}>
          <View style={styles.contenHeader}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SvgIconHealth width={33} height={33} />
              <Text style={styles.text}>Health Fit</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={handlePorfile}>
                <View style={{ marginHorizontal: 5 }}>
                  <SvgProfile width={49} height={45} />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  marginRight: 5,
                }}
              >
                <Text style={styles.textName}>{user?.fullName}</Text>
                <Text style={styles.textCity}>{text}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <ContenHome/>
    </View>
  );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  headerImg: {
    width: width,
    height: height - 510,
    position: "absolute",
    top: 0,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -60,
    paddingHorizontal: 10, // Meningkatkan ruang di sisi kanan dan kiri konten header
    width: "100%",
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "Raleway_700Bold",
  },
  textName: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "Raleway_700Bold",
  },
  textCity: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "400",
  },

});
