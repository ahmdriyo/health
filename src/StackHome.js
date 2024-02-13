// StackHome.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeUser from "./pages/dashboard/homeUser";
import StackLogin from "./StackLogin";

const StacskHome = createStackNavigator();

function StackHome() {
  return (
    <StacskHome.Navigator
      initialRouteName="HomeUser"
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
      <StacskHome.Screen
        name="HomeUser"
        component={HomeUser}
        options={{ headerShown: false }}
      />
      <StacskHome.Screen
        name="StackLogin"
        component={StackLogin}
        options={{ headerShown: false }}
      />
    </StacskHome.Navigator>
  );
}

export default StackHome;
