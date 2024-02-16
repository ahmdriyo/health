import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { firebase } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackHome from "./StackHome";
import StackLogin from "./StackLogin";

const Stack = createStackNavigator();

function Main() {
  const [initialize, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error checking auth: ", error);
      } finally {
        setInitializing(false);
      }
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName !== null) {
          setName(storedName);
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
    

    checkAuth();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe();
  }, []);

  function onAuthStateChanged(currentUser) {
    setUser(currentUser);
    setInitializing(false);
  }

  if (initialize) return null;
  // console.log("user")
  // console.log(user)
  // console.log("name")
  // console.log(name)
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
      {name ? (
        <Stack.Screen
          name="StackHome"
          component={StackHome}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="StackLogin"
          component={StackLogin}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default Main;
