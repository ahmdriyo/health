import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatRoomHeader = ({ user, onBack }) => {
  // console.log("user",user)
  const Stack = createStackNavigator();
  useEffect(() => {
    console.log("ini user chat",user)
  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderTopWidth: 1,
          paddingHorizontal: 10,
          width: "100%",
          height: 70,
        }}
      >
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity onPress={onBack}>
            <Entypo name="chevron-left" size={hp(5)} color="#737373" />
          </TouchableOpacity>
        <Text style={{marginLeft:10,fontWeight:'bold'}}>MAlok</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 25, marginHorizontal: 5 }}>
          <Ionicons name="call" size={hp(3)} color="#373737" />
          <Ionicons name="videocam" size={hp(3)} color="#373737" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({});
