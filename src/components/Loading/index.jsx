import React from "react";
import LottieView from "lottie-react-native";
import {Text, View,StyleSheet,ActivityIndicator } from "react-native";

const Loading = ({ size }) => {
  return (
    <View style={styles.container}>
      <Text>Memuat</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loading;
