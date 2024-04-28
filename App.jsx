
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/Main';
import { AuthContextProvider } from './src/Auth/authContext';


export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>

      <Main/>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
