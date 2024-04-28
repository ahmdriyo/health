import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { doc,getDoc,setDoc } from 'firebase/firestore'
import { auth,db } from "../../config";

export const  AuthContext = createContext ();
export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated,setIsAuthenticated] = useState(undefined)

  useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        console.log('got user :' ,user)
        // if(user) {
        //   setIsAuthenticated(true);
        //   setUser(user)
        //   updateUserData(user.uid);
        // }else{
        //   setIsAuthenticated(false)
        //   setUser(null)
        // }
      })
      return unsub;
  },[])

  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users',userId);
    console.log("docRef",docRef)
    const docSnap = await getDoc(docRef);
    console.log("docSnap",docSnap)

    if(docSnap.exists()) {
      let data = docSnap.data();
      console.log('data ku',data)
      setUser({...user, username: data.username, profileUrl: data.profileUrl,userId: data.userId})
    }
  }
  const login = async (email,password) => {
    try {
      const response = await signInWithEmailAndPassword(auth,email,password);
      return {success: true}
    } catch (e) {
      let msg = e.message;
      if(msg.includes('(auth/invalid-email)')) msg ="Invalid email";
      if(msg.includes('(auth/invalid-credential)')) msg ="Email dan Password Tidak Valid";
      if(msg.includes('(auth/weak-password)')) msg ="Password Minimal 6 Karakter";
      return {success : false, msg};
    }
  }
  const logout = async () => {
    try {
      await signOut(auth);
      return {success : true}
    } catch (e) {
      return {success : false, msg: e.message, error: e}
      
    }
  }
  const register = async (email,password,username) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email,password);
      // console.log('response user', response?.user)

      // setUser(response?.user);
      // setIsAuthenticated(true);

      await setDoc(doc(db, "users", response?.user?.uid),{
        username,
        userId : response?.user?.uid
      });
      return { success : true, data: response?.user};
      
    } catch (e) {
      let msg = e.message;
      if(msg.includes('(auth/invalid-email)')) msg ="Invalid email";
      if(msg.includes('(auth/email-already-in-use)')) msg ="email Sudah Tersedia";
      if(msg.includes('(auth/weak-password)')) msg ="Password Minimal 6 Karakter";
      return {success : false, msg};
    }
  }

  return (
    <AuthContext.Provider value={{user,isAuthenticated,login,logout,register}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(AuthContext);

  if(!value) {
    throw new Error("useAuth null be wrooo insiden")
  }
  return value;
}