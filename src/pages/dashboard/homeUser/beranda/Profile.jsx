import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import SvgProfile from "../../../../assets/Image/Icon/Profile";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity style={{position:'absolute',left:'5%',top:15}}
        onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginVertical: 60 }}>
          <SvgProfile width={150} height={145} />
        </View>
        <View style={styles.borderText}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            Ahmad akada akdakaai
          </Text>
        </View>
        <View style={styles.borderText}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            Ahmad akdakaai
          </Text>
        </View>
        <View style={styles.borderText}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            Ahmad akada
          </Text>
        </View>
        <View style={styles.borderText}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            akada akdakaai
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  borderText: {
    width: "90%",
    height: 50,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin:5
  },
});
