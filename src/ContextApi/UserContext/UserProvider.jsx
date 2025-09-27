import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase.config";
import axios from "axios";


const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const res = await axios.get(` https://car-rental-system-server-beta.vercel.app/user?email=${currentUser?.email}`);
        

        
        if (res?.data) {
          setUser({ ...currentUser, role: res.data.role });
        } else {
          setUser({ ...currentUser, role: "user" });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  return () => {
    unSubscribe();
  };
}, []);


  const userInfo = {
    user,
    loading,
    createUser,
    googleLogin,
    logOut,
    role,
    loginWithEmailAndPassword,
  };
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
