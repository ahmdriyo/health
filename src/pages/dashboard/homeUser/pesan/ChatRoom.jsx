import {
  Alert,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState,useRef } from "react";
import ChatRoomHeader from "../../../../components/ChatRoomHeader/index";
import MessageList from "../../../../components/MessageList/index";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../../Auth/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {getRoomId} from "../../../../../utils/cummon"
import { Timestamp, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../../../../../config";
import { useNavigation, useRoute } from "@react-navigation/native";
const ChatRoom = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const textRef = useRef('');
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const handleGoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
      createRoomIfNoExists();
      let roomId = getRoomId(user?.userId, route.params.userId);
      // console.log("UserId:", user?.userId);
      // console.log("router id:", route.params.userId);
      // console.log("room id", roomId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy('createdAt', 'asc'));
      let unsub = onSnapshot(q, (snapshot) => {
        let allMessages = snapshot.docs.map(doc => doc.data());
        setMessages([...allMessages]);
        updateScrollView();
      });

      const keyboardUp = Keyboard.addListener(
        "keyboardDidShow", updateScrollView
      );

      return () => {
        unsub();
        keyboardUp.remove();
      };
    },[user, route.params.userId]);

  useEffect(() => {
    updateScrollView()
  },[messages])

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated : false})
    })
  }
  const createRoomIfNoExists = async () => {
    let roomId = getRoomId(user?.userId, route.params.userId);
    const docRef = doc(db, "rooms", roomId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, { createdAt: Timestamp.fromDate(new Date()) });
    }
  };
  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, route.params.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef.current) inputRef.current.clear();

      await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        senderName: user?.fullName,
        createdAt: Timestamp.fromDate(new Date())
      });

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" hidden={false} />
      <ChatRoomHeader user={route.params.userId.fullName} onBack={handleGoBack} />
      <View style={{ flex: 1 }}>
        <View>
          <MessageList user={route.params.userId} scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              width:"95%",
              marginHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderWidth: 2,
              borderColor:'#b0b0b0',
              padding: 7,
              position:'absolute',
              bottom:hp(1.5),
              borderRadius: 30,
            }}
          >
            <TextInput
              ref={inputRef}
              onChangeText={value => textRef.current = value}
              placeholder="Type message...."
              style={{ fontSize: hp(2),marginLeft:9,width:"90%"}}
            />
            <TouchableOpacity style={{marginVertical:5}} onPress={handleSendMessage}>
              <Feather name="send" size={hp(3)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
