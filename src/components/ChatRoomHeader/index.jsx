import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChatRoomHeader = ({ user, onBack }) => {
  // console.log("user",user)
  const Stack = createStackNavigator();
  return (
      <Stack.Screen
        name=""
        options={{
          title: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={{flex:1,flexDirection:'row',gap:8}}>
              <TouchableOpacity onPress={onBack}>
                <Entypo name="chevron-left" size={hp(5)} color="#737373" />
              </TouchableOpacity>
              <View style={{flexDirection:"row",gap:20}}>
                <Image
                  source={user?.profileUrl}
                  style={{ height: hp(5), aspectRatio: 1, borderRadius: 100 }}
                />
                <Text style={{ fontSize: hp(3) }} className="text-neutral-700 font-medium">
                  {user?.username}
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection:'row',gap:25,marginHorizontal:5}}>
              <Ionicons name="call" size={hp(3)} color="#373737" />
              <Ionicons name="videocam" size={hp(3)} color="#373737" />
            </View>
          ),
        }}
      />
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({});
