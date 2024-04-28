import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from "../../../../../config";
import { useAuth } from "../../../../Auth/authContext";
import LoadingButton from "../../../../components/LoadingButton";

const Apoteker = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(userRef);
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    getUsers();
  }, []);
  const openChatRoom = () => {
    navigation.navigate("Pesan");
  };
  // const filteredUsers = users.filter(user => user.role && user.role === 'apoteker');

  // console.log("user", users);
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", height: 900 }}>
      {loading ? (
        <LoadingButton/>
      ):(
        <ScrollView>
        {users.map((user, index) => (
          <TouchableOpacity key={index} onPress={() => {openChatRoom()}}>
            <Text>{user.fullName}</Text>
            {/* <Text>{user.longExperience.label}</Text> */}
            {/* <Text>{user.spesialis.label}</Text> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
      )}
      
    </View>
  );
};

export default Apoteker;

const styles = StyleSheet.create({});
