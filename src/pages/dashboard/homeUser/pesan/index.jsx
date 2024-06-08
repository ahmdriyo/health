import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,

} from "react-native";
import React, { useEffect, useState } from "react";

import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from "../../../../../config";
import { useAuth } from "../../../../Auth/authContext";
import ChatList from "./ChatList";
const Pesan = ({ navigation }) => {
const {logout,user} = useAuth();
const [users, setUsers] = useState([''])
useEffect(() => {
  if (user?.userId) {
    getUsers();
  }
  // console.log("user data", user);
}, []);
const getUsers = async () => {
  const q = query(userRef, where('userId', '!=',user?.userId))
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach(doc => {
    data.push({...doc.data()})
  });
  setUsers(data)
  // console.log("data GetUser",data)
}
return (
  <View style={{flex:1,backgroundColor:"white"}}>
    <StatusBar style="light" />
    {
      users.length > 0 ? (
        <ChatList currentUser={user} users={users}/>
      ) : (
        <View style={{marginTop:90,alignItems:'center'}}>
          <ActivityIndicator size="large"  color="#fff200"/>
        </View>
      )
    }
  </View>
)
}

export default Pesan;

const styles = StyleSheet.create({});
