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
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../../../config";
import Buttons from "../../../../components/Button/Index";
import * as Updates from "expo-updates";
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from "../../../../../config";
import { useAuth } from "../../../../Auth/authContext";
import ChatList from "./ChatList";
const Pesan = ({ navigation }) => {
//   const [name, setName] = useState(null);
//   useEffect(() => {
//     const fetchUserData = async () => {
//         try {
//           const getData = await AsyncStorage.getItem('userData');
//           const { fullName } = JSON.parse(getData);
//           setName(fullName);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } 
//     fetchUserData();
//   }, []);
//   console.log("name : ", name);

//   const handleLogout = async () => {
//     try {
//       await firebase.auth().signOut();
//       await AsyncStorage.removeItem('userData');
//       setName(null)
//       await Updates.reloadAsync();
//       console.log("Logut User Berhasil")
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Text>Nama Pengguna: {name}</Text>
//       <Text>User {name}</Text>
//       <TouchableOpacity onPress={handleLogout}>
//         <Text>logout</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };
const {logout,user} = useAuth();
const [users, setUsers] = useState([''])
useEffect(() => {
  console.log("akamak",user)
  if(user?.uid)
  getUsers()
},[])

const getUsers = async () => {
  const q = query(userRef, where('userId', '!=',user?.uid))

  const querySnapshot = await getDocs(q);
  let data = [];
  // console.log("q",q)
  querySnapshot.forEach(doc => {
    data.push({...doc.data()})
  });
  setUsers(data)
  console.log("eee",data)
}
// const nama = user.username;
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
