"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "./firebase.config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => checkAuth();
  }, []);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
