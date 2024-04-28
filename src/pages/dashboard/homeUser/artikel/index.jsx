import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, Image, ImageBackground,StyleSheet,Dimensions, TextInput, TouchableOpacity } from "react-native";
import { bgHeader } from "../../../../assets";
import SvgProfile from "../../../../assets/Image/Icon/Profile";
import LoadingButton from "../../../../components/LoadingButton";

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  function getData() {
    setRefreshing(true);
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=2f3a082eee0744a89fe7d765b0bb4ab1"
    )
      .then((response) => response.json())
      .then((json) => {
        const filteredDatas = json.articles.filter((item) => item.author && item.description);
        setData(filteredDatas);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setRefreshing(false);
      });
  }
  const truncateText = (text,maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }
  const handleSearch = (text) => {
    setSearchKeyword(text);
    if (text.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
      item.description && item.description.toLowerCase().includes(text.toLowerCase())
    );
      setFilteredData(filtered);
    }
  };


  return (
<View style={{ flex: 1 }}>
  <View style={{ flex: 1, height: 580, width: 420 }}>
  
    <FlatList
      ListHeaderComponent={
        <ImageBackground source={bgHeader} style={styles.headerImg}>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>Artikel Kesehatan Terbaru !!!{`\n`}Edukasi Kesehatan</Text>
            <SvgProfile width={45} height={45} />
          </View>
          <View style={styles.borderInput}>
            <View style={styles.borderInputConten}>
              <TextInput 
              placeholder="Cari Artikel kesehatan...."
              onChangeText={handleSearch}
              value={searchKeyword}
              />
            </View>
          </View>
        </ImageBackground>
      } // Tambahkan komponen teks di sini
      data={filteredData}
      renderItem={({ item }) => (
      <TouchableOpacity>
        <View style={{flex:1,justifyContent:"center",alignContent:'center',alignItems:'center'}}>
        <View style={{width:380,backgroundColor:"#ffffff",marginVertical:5,flexDirection:'row',borderRadius:10,borderWidth:0.5,borderColor:"#b4b4ba",marginLeft:-10 }}>
          <View style={{width: 230,padding:20}}>
            <Text style={{ fontWeight: "bold" }}>Penulis: {item.author}</Text>
            <Text style={{fontSize:13}}>{truncateText(item.description, 130)}</Text>
          </View>
          <View style={{justifyContent:"center",margin:10,marginLeft:20}}>
            <Image style={{ width:110,height: 110,borderRadius:5}} source={{ uri: item.urlToImage }}/>
          </View>
          {/* <Text>Link {item.url}</Text> */}
        </View>
        </View>
      </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    <View style={{position:'absolute',top:"50%",left:'45%'}}>
      {refreshing && <LoadingButton />}
    </View>
  </View>
</View>


  );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  headerImg: {
    width: width,
    height: height - 560,
    justifyContent:'center',
  },
  viewHeader:{
    flexDirection:'row',
    justifyContent:"space-around",
    marginTop:10
  },
  textHeader:{
    color:"#ffffff",
    fontSize:15,
    fontWeight:'600'
  },
  borderInput:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  borderInputConten:{
    width:width -70,
    height:40,
    backgroundColor:'#e9f4f8',
    marginTop:3,
    borderRadius:10,
    borderWidth:1,
    paddingLeft:20,
    alignContent:'center',
    justifyContent:'center'
  } 
});