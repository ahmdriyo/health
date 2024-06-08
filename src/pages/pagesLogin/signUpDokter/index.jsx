import {
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import SvgLogin from "../../../assets/SvgLogin";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import Buttons from "../../../components/Button/Index";
import TextInputs from "../../../components/TextInput";
import InputPassword from "../../../components/InputPassword";
import DropdownComponentSpesialis from "../../../components/DropdownSpesialis";
import DropdownComponentExperience from "../../../components/DropdownExperience";
import { userRef } from "../../../../config";
import { alertEmailDuplicate, fieldError, minimumPasswordError } from "../../../customAlert";
import LoadingButton from "../../../components/LoadingButton";
import { useAuth } from "../../../Auth/authContext";
const SignUpDokter = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [spesialis, setSpesialis] = useState('');
  const [longExperience, setLongExperience] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("dokter");
  const [loading, setLoading] = useState(false);
  const { registerDokter,user } = useAuth();
  const [users, setUsers] = useState([''])
  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return 
  }
  const handleSpesialisSelect = (spesialis) => {
    setSpesialis(spesialis);
  };
  const handleExperienceSelect = (longExperience) => {
    setLongExperience(longExperience);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleRegisterDokters = async (email, password, fullName,address,longExperience,spesialis) => {
    if(fullName == ""){
      nameError();
      return;
    }
    if (!email || !password) {
      fieldError();
      return;
    }
    if (!isValidEmail(email)) {
      invalidEmailError();
      return;
    }
    if (password.length < 6) {
      minimumPasswordError();
      return;
    }
    setLoading(true)
    try {
      let response = await registerDokter(email, password, fullName, role,address,longExperience,spesialis);
      setLoading(false);
      if (!response.success) {
        Alert.alert("Sign Up", response.msg);
        return;
      }
      await getUsers();
    } catch (err) {
      setLoading(false)
      if ( err.message === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
        alertEmailDuplicate();
        setLoading(false)
        return;
      }
    }
  };
  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(userRef);
      let data = [];
      console.log("querySnapshot", querySnapshot);
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.userId !== user?.uid) {
          data.push(userData);
        }
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  useEffect(() => {
    if (user && user.uid) {
      getUsers();
    }
  }, [user]); 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#F9F8F8"
        translucent={true}
      />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.conten}>
          <View style={{marginBottom:-70,alignItems:'center'}}>
          <Text style={styles.text}>Hello Dokter</Text>
          <Text style={styles.textSec}>Sign Up</Text>
          </View>
          <SvgLogin width="50%" height="50%" />
          <View style={styles.contenTextInput}>
            <TextInputs placeholder="Full Name" onChangeText={(fullName) => setFullName(fullName)} />
            <TextInputs placeholder="Full Address" onChangeText={(address) => setAddress(address)}/>
            <DropdownComponentSpesialis onSelect={handleSpesialisSelect} />
            <DropdownComponentExperience onSelect={handleExperienceSelect}/>
            {/* <ImagePickers/> */}
            <TextInputs placeholder="Email" onChangeText={(email) => setEmail(email)} />
            <InputPassword placeholder="Password" onChangeText={(password) => setPassword(password)} />
          </View>
          {loading ? (
            <View style={{width: '75%',height : 45,}}>
              <LoadingButton/>
            </View>
          ):(
            <Buttons
            label="Sign Up"
            color="#ffffff"
            bgColor="#432C81"
            fontFamily="Raleway_700Bold"
            onPress={() => {
              handleRegisterDokters(email, password, fullName,address,spesialis,longExperience)}
            }
          />
          )}
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#82799D", marginRight: 5 }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#432C81" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUpDokter;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  conten: {
    height: height + 50,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  text: {
    fontSize: 22,
    fontFamily: "Raleway_700Bold",
    color: "#432C81",
  },
  contenTextInput: {
    width: "100%",
    alignItems: "center",
    marginTop: -80,
    marginBottom:20,
  },
  textSec: {
    fontSize: 26,
    fontFamily: "Raleway_700Bold",
    color: "#432C81",

  },
});
