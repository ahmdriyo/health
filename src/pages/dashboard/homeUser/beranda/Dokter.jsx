import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoadingButton from "../../../../components/LoadingButton";
import { useAuth } from "../../../../Auth/authContext";
import { getDocs, query, where } from "firebase/firestore";
import { userRef } from "../../../../../config";
import ChatListDokter from "../../../../components/ChatListDokter";
const Dokter = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [users, setUsers] = useState([''])
  useEffect(() => {
    if (user?.userId) {
      setLoading(true)
      getUsers();
    }
    console.log("user data apoek", user);
  }, [user?.userId]);
  const getUsers = async () => {
    const q = query(userRef, where('userId', '!=',user?.userId))
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data()})
    });
    setUsers(data)
    setLoading(false);
    // console.log("data GetUser apotek",data)
  }

  const openChatRoom = () => {
    navigation.navigate("Pesan");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", height: 900 }}>
      {loading ? (
        <LoadingButton/>
      ):(
        <ChatListDokter currentUser={user} users={users}/>
      )}
      
    </View>
  );
};

export default Dokter;

const styles = StyleSheet.create({});
