import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/pagesLogin/signin';
import SignUpAs from './pages/pagesLogin/signupAs';
import SignUpUser from './pages/pagesLogin/signUpUser';
import SignUpApoteker from './pages/pagesLogin/signUpApoteker';
import SignUpDokter from './pages/pagesLogin/signUpDokter';
import Login from './pages/pagesLogin/login';
import { useEffect, useState } from 'react';
import {firebase} from '../config';
import HomeUser from './pages/dashboard/homeUser';
import HomeDokter from './pages/dashboard/homeDokter';
import HomeApoteker from './pages/dashboard/homeApoteker';
const StacksLogin = createStackNavigator();

function StackLogin() {
  const [initialize, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user){
    setUser(user);
    if(initialize) setInitializing(false);
  }
  useEffect(() => {
    const sub = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  })
  if (initialize) return null;
  return (
    <StacksLogin.Navigator
    initialRouteName="SignIn"
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
    <StacksLogin.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <StacksLogin.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <StacksLogin.Screen
      name="SignUpAs"
      component={SignUpAs}
      options={{ headerShown: false }}
    />
    <StacksLogin.Screen
      name="SignUpUser"
      component={SignUpUser}
      options={{ headerShown: false }}
    />
    <StacksLogin.Screen
      name="SignUpApoteker"
      component={SignUpApoteker}
      options={{ headerShown: false }}
    />
    <StacksLogin.Screen
      name="SignUpDokter"
      component={SignUpDokter}
      options={{ headerShown: false }}
    />
    <StacksLogin.Screen
      name="HomeUser"
      component={HomeUser}
      options={{ headerShown: false }}
    />
    <StacksLogin.Screen
      name="HomeDokter"
      component={HomeDokter}
      options={{ headerShown: false }}
    />
    <StacksLogin.Screen
      name="HomeApoteker"
      component={HomeApoteker}
      options={{ headerShown: false }}
    />
  </StacksLogin.Navigator>
);
}

export default StackLogin;