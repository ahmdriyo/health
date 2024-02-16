// StackHome.js
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeUser from "./pages/dashboard/homeUser";
import StackLogin from "./StackLogin";
import HomeDokter from "./pages/dashboard/homeDokter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeApoteker from "./pages/dashboard/homeApoteker";
import SignIn from "./pages/pagesLogin/signin";
const StacskHome = createStackNavigator();

function StackHome() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = await AsyncStorage.getItem("userRole");
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <StacskHome.Navigator>
      {userRole === "users" ? (
        <StacskHome.Screen
          name="HomeUser"
          component={HomeUser}
          options={{ headerShown: false }}
        />
      ) : userRole === "dokters" ? (
        <StacskHome.Screen
          name="HomeDokter"
          component={HomeDokter}
          options={{ headerShown: false }}
        />
      ) : userRole === "apotekers" ? (
        <StacskHome.Screen
          name="HomeApoteker"
          component={HomeApoteker}
          options={{ headerShown: false }}
        />
      ):(
        <StacskHome.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      )}
      <StacskHome.Screen
        name="StackLogin"
        component={StackLogin}
        options={{ headerShown: false }}
      />
    </StacskHome.Navigator>
  );
}

export default StackHome;
