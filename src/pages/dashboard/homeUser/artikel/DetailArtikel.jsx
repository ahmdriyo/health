import { StyleSheet, Text, TouchableOpacity, Linking,View,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailArtikel = ({ route }) => {
  const { selectedItem } = route.params;

  const handleOpenUrl = () => {
    if (selectedItem && selectedItem.url) {
      Linking.openURL(selectedItem.url);
    }
  };
  return (
    <SafeAreaView>
      <Text>Data yang dipilih:</Text>
      <Text>Author: {selectedItem.author}</Text>
      <Text>titel: {selectedItem.title}</Text>
      <Text>Description: {selectedItem.description}</Text> 
      <Text>Content: {selectedItem.content}</Text>
      <Image style={{width:100,height:100}} source={{ uri: selectedItem.urlToImage }} ></Image>
      <TouchableOpacity onPress={handleOpenUrl}>
        <Text>Open Link {selectedItem.url}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default DetailArtikel

const styles = StyleSheet.create({})