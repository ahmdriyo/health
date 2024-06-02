import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  Dimensions
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
const DetailArtikel = ({ route,navigation }) => {
  const { selectedItem } = route.params;

  const handleOpenUrl = () => {
    if (selectedItem && selectedItem.url) {
      Linking.openURL(selectedItem.url);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <AntDesign name="left" size={24} color="black"
        style={{marginHorizontal:15,marginRight:-15}}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Artikel Kesehatan</Text>
        </View>
      </View>
      <View style={{marginVertical:10}}>
        <Image style={{ width: width -10, height: 200,borderRadius:5,marginHorizontal:5 }}source={{ uri: selectedItem.urlToImage }}></Image>
      </View>
      <View style={{marginHorizontal:10}}>
        <Text style={{fontWeight:"300"}}>Author: {selectedItem.author}</Text>
        <Text style={{fontWeight:'800'}}>{selectedItem.title}</Text>
        <Text>{selectedItem.description}</Text>
        <Text>Content: {selectedItem.content}</Text>
      </View>
      <View style={{justifyContent:'center',marginVertical:5,marginHorizontal:10}}>
        <TouchableOpacity onPress={handleOpenUrl} style={
        {
          width:80,
          // height:40,
          // backgroundColor:'grey',
          // justifyContent:"center",
          // alignContent:'center',
          // alignItems:'center',
          // borderRadius:50,
          // borderWidth:1,
          borderBottomWidth:1,
          borderColor:"blue"
          }}>
        <Text style={{color:"blue"}}>Lihat Semua</Text>
      </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

export default DetailArtikel;
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth:2,
    borderColor:"#dfdfdf"
  },
  headerTextContainer: {
    flex: 1, 
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center', 
    fontWeight: "bold",
  },
});
