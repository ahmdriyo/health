import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { formateDate, getRoomId } from "../../../utils/cummon";
import { MaterialIcons } from '@expo/vector-icons';
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../config";
import { icon } from "../../assets";
import ButtonStartChat from "../ButtonStartChat";
const ChatItemDokter = ({ item, navigation, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(undefined);
  const openChatRoom = () => {
    navigation.navigate("ChatRoom", { userId: item });
  };
  const openProfile = () => {
    navigation.navigate("Profile")
  }

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

  return (
    <View style={styles.conten}>
      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={openProfile} style={{flexDirection:'row'}}>
          <Image
          source={icon}
          style={{ height: 50, width: 50, borderRadius: 33, marginRight: 10 }}
          />
          <View style={{ }}>
            <Text style={{ fontWeight: "bold", fontSize: hp(2) }}>{item?.fullName}</Text>
            <Text style={{ fontSize: hp(1.9), fontWeight: "600",color:'#2f2f2f' }}>{item?.spesialis.label}</Text>
            <View style={{flexDirection:'row',gap:5,backgroundColor:'#c7c7c7',padding:3,paddingLeft:10,paddingRight:10,borderRadius:6,marginVertical:2}}>
              <MaterialIcons name="work" size={19} color="black" />
              <Text style={{ fontSize: hp(1.9), fontWeight: "bold" }}>{item?.longExperience.label}</Text>
            </View>
            <Text style={{ fontSize: hp(1.9), fontWeight: "bold" }}>Rp. 40.000</Text>
          </View>
        </TouchableOpacity>
        <ButtonStartChat onPress={openChatRoom}/>
      </View>
    </View>
  );
};

export default ChatItemDokter;

const styles = StyleSheet.create({
  conten: {
    marginHorizontal: 10,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderColor: "#DADADA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
  },
});
