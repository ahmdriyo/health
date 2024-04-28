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
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../../../../../config";
const ChatRoom = ({navigation,route}) => {
  const { item } = route.params; 
  const {user } = useAuth()
  const [messages, setMessages] = useState([]);
  const textRef = useRef('');
  const inputRef = useRef(null)
  const scrollViewRef = useRef(null)
  const handleGoBack = () => {
    navigation.goBack()
  };

  useEffect(() => {
    createRoomIfNoExists();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy('createdAt' , 'asc'));

    let unsub = onSnapshot (q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data ();
      });
      setMessages([...allMessages]);
      updateScrollView();
    })
    const keyboardUp = Keyboard.addListener(
      "keyboardDidShow",updateScrollView
    )
    return () => {
      unsub();
      keyboardUp.remove();
    }
  },[])
  useEffect(() => {
    updateScrollView()
  },[messages])

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated : false})
    })
  }
  const createRoomIfNoExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms",roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    })
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if(!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if(inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messagesRef, {
        userId : user?.userId,
        text: message,
        profileUrl : user?.profileUrl,
        senderName : user?.username,
        createdAt : Timestamp.fromDate(new Date())
      })

      // console.log (" New message" , newDoc.id)
    } catch (error) {
      Alert.alert("message", error.message)
    }
  }
// console.log("message :" ,messages)

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" hidden={false} />
      <ChatRoomHeader user={item} onBack={handleGoBack} />
      <View style={{ flex: 1 }}>
        <View>
          <MessageList user={item} scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
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
