import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ButtonStartChat = ({onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    >
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 45,
          width: 100,
          height: 30,
          borderRadius:5,
          backgroundColor: "#dd71eb",
        }}
      >
        <Text style={{ fontWeight: "500", textAlign: "center" }}>
          Mulai Chat
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonStartChat;

const styles = StyleSheet.create({});
