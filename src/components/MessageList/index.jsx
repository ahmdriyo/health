import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MessageItem from '../MessageItem/index'

const MessageList = ({user,messages,currentUser,scrollViewRef}) => {
  // console.log("userlist",user)
  // console.log("messages",messages)
  return (
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:10}} style={styles.container}>
      {
        messages.map((message, index) => {
          return(
            <MessageItem message={message} key={index} currentUser={currentUser}/>
          )
        })
      }
    </ScrollView>
  )
}

export default MessageList

const styles = StyleSheet.create({
  container:{
    marginBottom:70
  }
})