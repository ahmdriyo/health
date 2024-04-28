import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DropdownComponentSpesialis from "../../../components/DropdownSpesialis";
import DropdownComponentExperience from "../../../components/DropdownExperience";

const DokterScreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
      <DropdownComponentExperience/>
      <DropdownComponentSpesialis/>
    </View>
  )
}

export default DokterScreen

const styles = StyleSheet.create({})