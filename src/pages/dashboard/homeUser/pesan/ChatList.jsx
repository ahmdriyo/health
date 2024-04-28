import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Mengimpor useNavigation dari @react-navigation/native
import ChatItem from "./ChatItem";

const ChatList = ({ users, currentUser }) => {
  const navigation = useNavigation(); // Menggunakan useNavigation untuk mendapatkan objek navigasi

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 15 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 == users.length}
            navigation={navigation} // Mengirimkan objek navigasi ke dalam komponen ChatItem
            currentUser={currentUser}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
