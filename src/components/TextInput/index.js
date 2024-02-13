import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TextInputs = ({name,value,keyboardType,onChangeText,placeholder}) => {
  return (
    <TextInput
    style={styles.textInput}
      name={name}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor='#7B6BA8'
    >
    </TextInput>
  )
}

export default TextInputs

const styles = StyleSheet.create({
  textInput:{
    marginTop:5,
    width:'75%',
    alignContent:'center',
    justifyContent:'center',
    height:45,
    borderWidth:2,
    borderRadius:10,
    opacity:0.7,
    borderColor:'#C5B6F9',
    paddingHorizontal: 12,
  },
})