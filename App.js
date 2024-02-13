// import { NavigationContainer } from '@react-navigation/native';
// import Main from './src/Main';

// function App() {
//   return (
//     <NavigationContainer>
//       <Main/>
//     </NavigationContainer>
//   );
// }
// export default App

import { useState,useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import Main from './src/Main';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Main/>
    </NavigationContainer>
  );
  // const [initialize, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  // function onAuthStateChanged(user){
  //   setUser(user);
  //   if(initialize) setInitializing(false);
  // }
  // useEffect(() => {
  //   const sub = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //   return sub;
  // },[]);
  // if (initialize) return null;
  // if (!user) {
  //   return (
  //     <Main/>
  //   )
  // }
  // return (
  //   <Main/>
  // )
}
export default App;

const styles = StyleSheet.create({})