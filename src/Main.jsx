import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { firebase } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "./pages/pagesLogin/signin";
import Login from "./pages/pagesLogin/login";
import SignUpAs from "./pages/pagesLogin/signupAs";
import SignUpUser from "./pages/pagesLogin/signUpUser";
import SignUpApoteker from "./pages/pagesLogin/signUpApoteker";
import SignUpDokter from "./pages/pagesLogin/signUpDokter";
import HomeDokter from "./pages/dashboard/homeDokter";
import HomeUser from "./pages/dashboard/homeUser";
import HomeApoteker from "./pages/dashboard/homeApoteker";
import ImagePickers from "./components/ImagePicker";
import ChatRoom from "./pages/dashboard/homeUser/pesan/ChatRoom";
import DetailArtikel from "./pages/dashboard/homeUser/artikel/DetailArtikel";
import { useAuth } from "./Auth/authContext";
import SplashScreen from "./pages/splashScreen";


const Stack = createStackNavigator();
function Main() {

  // if(userRole){
  //   if(userRole === "user"){
  //     return (
  //       <Stack.Navigator
  //       screenOptions={{
  //         animationEnabled: true,
  //         cardStyleInterpolator: ({ current }) => ({
  //           cardStyle: {
  //             transform: [
  //               {
  //                 translateX: current.progress.interpolate({
  //                   inputRange: [0, 1],
  //                   outputRange: [500, 0],
  //                 }),
  //               },
  //             ],
  //           },
  //         }),
  //       }}
  //       >
  //         <Stack.Screen name="HomeUser" component={HomeUser} options={{ headerShown: false }} />
  //         <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: false }} />
  //         <Stack.Screen name="DetailArtikel" component={DetailArtikel} options={{ headerShown: false }} />
  //       </Stack.Navigator>
  //     );
  //   }else if(userRole === "dokter"){
  //     return (
  //       <Stack.Navigator
  //       screenOptions={{
  //         animationEnabled: true,
  //         cardStyleInterpolator: ({ current }) => ({
  //           cardStyle: {
  //             transform: [
  //               {
  //                 translateX: current.progress.interpolate({
  //                   inputRange: [0, 1],
  //                   outputRange: [500, 0],
  //                 }),
  //               },
  //             ],
  //           },
  //         }),
  //       }}
  //       >
  //         <Stack.Screen name="HomeDokter" component={HomeDokter} options={{ headerShown: false }}/>
  //       </Stack.Navigator>
  //     );
  //   }else if(userRole === "apoteker"){
  //     return (
  //       <Stack.Navigator
  //       screenOptions={{
  //         animationEnabled: true,
  //         cardStyleInterpolator: ({ current }) => ({
  //           cardStyle: {
  //             transform: [
  //               {
  //                 translateX: current.progress.interpolate({
  //                   inputRange: [0, 1],
  //                   outputRange: [500, 0],
  //                 }),
  //               },
  //             ],
  //           },
  //         }),
  //       }}
  //       >
  //         <Stack.Screen name="HomeApoteker" component={HomeApoteker} options={{ headerShown: false }}/>
  //       </Stack.Navigator>
  //     );
  //   }else{
  //     return
  //   }


  // }else{
    return (
      <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0],
                }),
              },
            ],
          },
        }),
      }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="ImagePickers" component={ImagePickers} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpAs" component={SignUpAs}options={{ headerShown: false }} />
        <Stack.Screen name="SignUpUser" component={SignUpUser} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpApoteker" component={SignUpApoteker} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpDokter" component={SignUpDokter} options={{ headerShown: false }} />
        <Stack.Screen name="HomeUser" component={HomeUser} options={{ headerShown: false }} />
        <Stack.Screen name="HomeDokter" component={HomeDokter} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeApoteker" component={HomeApoteker} options={{ headerShown: false }}/>
        <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailArtikel" component={DetailArtikel} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  }

export default Main;
