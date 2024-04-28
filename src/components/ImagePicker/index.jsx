import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../config";
import * as FileSystem from "expo-file-system";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import firebase from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      } else {
        // Menampilkan alert jika pemilihan gambar dibatalkan
        Alert.alert("Upload image canceled");
      }
    } catch (error) {
      // Menangani kesalahan lain yang mungkin terjadi selama proses pemilihan gambar
      ToastAndroid.show('Upload Image Cancel!', ToastAndroid.SHORT);
    }
  };

  
  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);
      await ref.put(blob);
      setUploading(false);
      Alert.alert("Photo Uploaded !!!");
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  // console.log(image)
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row",}}>
          <Entypo name="text-document" size={22} color="#6069e9" />
          <Text style={{marginHorizontal:5,fontSize:16}}>Lisensi</Text>
        </View>
        { image ? (
          <View>
          <TouchableOpacity style={{flexDirection:'row'}}
          onPress={pickImage}
          >
            <Text style={{marginHorizontal:5}}>Uploaded</Text>
            <AntDesign name="checkcircleo" size={22}  color="#6069e9" />
          </TouchableOpacity>
        </View>
        ): (
        <View>
          <TouchableOpacity style={{flexDirection:'row'}}
          onPress={pickImage}
          >
            <Text style={{marginHorizontal:5}}>Search Files</Text>
            <AntDesign name="folderopen" size={22} color="#6069e9" />
          </TouchableOpacity>
        </View>
        )}
      </View>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    <Button title="Upload image to Firebase" onPress={uploadMedia} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "75%",
    marginTop: 5,
    height: 45,
    borderWidth: 2,
    borderRadius: 10,
    opacity: 0.7,
    borderColor: "#C5B6F9",
    paddingHorizontal: 8,
  },
});
