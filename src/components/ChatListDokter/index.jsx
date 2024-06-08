import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // Mengimpor useNavigation dari @react-navigation/native
import ChatItemDokter from "../ChatItemDokter";

const ChatListDokter = ({ users, currentUser }) => {
  const navigation = useNavigation();
  useEffect(() => {
    console.log("Data User",users)
  })
  const filteredUsers = users.filter(user => user.role === 'dokter');

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredUsers}
        contentContainerStyle={{ paddingVertical: 15 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItemDokter
            noBorder={index + 1 == users.length}
            navigation={navigation}
            currentUser={currentUser}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default ChatListDokter;

const styles = StyleSheet.create({});
