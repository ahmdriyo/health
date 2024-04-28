import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { formateDate, getRoomId } from "../../../../../utils/cummon";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {getFirestore} from 'firebase/firestore';
import { db } from "../../../../../config";
const ChatItem = ({ item, navigation, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(undefined);
  const openChatRoom = () => {
    navigation.navigate("ChatRoom", { params: item });
  };

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });
    return unsub;
  }, []);

  // console.log("lastMessage",lastMessage)
  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      let formattedDate = new Date(date?.seconds * 1000);
      let hours = formattedDate.getHours();
      let minutes = formattedDate.getMinutes();
      hours = hours < 10 ? '0' + hours : hours; 
      minutes = minutes < 10 ? '0' + minutes : minutes; 
      let timeString = hours + ':' + minutes;
      return timeString;
    }
  };

  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";
    let maxLength = 33;
    if (lastMessage) {
      let messageText = lastMessage.text;
      if (messageText.length > maxLength) {
        // Potong teks pesan jika melebihi panjang maksimum
        messageText = messageText.slice(0, maxLength) + "...";
      }
      if (currentUser?.userId == lastMessage?.userId)
        return "Anda: " + messageText;
      return messageText;
    } else {
      return "Say hi";
    }
  };

  // console.log("renderLastMessage : ", renderLastMessage());
  // console.log("lastMessage : ", lastMessage);
  // console.log("currentUser : ", currentUser);
  console.log(item)
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={styles.conten}
    >
      <Image
        source={{ uri: item?.profileUrl }}
        style={{ height: 50, width: 50, borderRadius: 33, marginRight: 10, }}
      />
      <View style={{ flex: 1, gap: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold", fontSize: hp(2) }}>
            {item?.username}
          </Text>
          <Text style={{ fontWeight: "500", fontSize: hp(2) }}>
            {renderTime()}
          </Text>
        </View>
        <Text style={{ fontSize: hp(1.9), fontWeight: "400" }}>
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  conten:{
    marginHorizontal: 10,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderColor: "#DADADA",
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10,
    gap:5,
  }
});
