import { StyleSheet, Text, View } from "react-native";
import React, { useEffect,useState } from "react";

const MessageItem = ({ message, currentUser}) => {

  
  const renderTime = () => {
    if (message) {
      let date = message?.createdAt;
      let formattedDate = new Date(date?.seconds * 1000);
      let hours = formattedDate.getHours();
      let minutes = formattedDate.getMinutes();
      hours = hours < 10 ? '0' + hours : hours; 
      minutes = minutes < 10 ? '0' + minutes : minutes; 
      let timeString = hours + ':' + minutes;
      return timeString;
    }
  };
  
  
  // console.log(renderTime())
  
  if (currentUser?.userId == message?.userId) {
    return (
      <View style={styles.container}>
        <View style={styles.textConten}>
          <Text style={styles.font}>{message?.text}</Text>
          <Text style={styles.fontTime}>{renderTime()}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.containerSec}>
        <View style={styles.textContenSec}>
          <Text style={styles.font}>{message?.text}</Text>
          <Text style={styles.fontTimeSec}>{renderTime()}</Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 15,
  },
  containerSec: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 15,
  },
  textConten: {
    flexDirection: "column",
    width: "auto",
    height: "auto",
    backgroundColor: "#e4e6cd",
    paddingVertical: 5,
    paddingBottom: 5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: "flex-end",
  },
  textContenSec: {
    flexDirection: "column",
    width: "auto",
    height: "auto",
    backgroundColor: "#b9bac7",
    paddingVertical: 5,
    paddingBottom: 5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  font: {
    fontSize: 16,
    fontWeight: "400",
  },
  fontTime: {
    fontSize: 11,
    marginRight:-3
  },
  fontTimeSec: {
    fontSize: 11,
    marginLeft:-3
  },
});
