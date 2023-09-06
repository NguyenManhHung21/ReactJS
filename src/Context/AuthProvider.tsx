import {  onAuthStateChanged } from "firebase/auth";
import { useState, createContext, ReactNode, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {  doc, onSnapshot } from "firebase/firestore";
import { IUser } from "../typeChatApp";

export interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({});

export default function AuthProvider(props: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | {}>({});
  useEffect(() => {
    onAuthStateChanged(auth, (user: IUser | null) => {
      if (user) {
        // get real-time a document
        onSnapshot(doc(db, "users", user.email as string), (doc) => {
          const { displayName, email, uid, photoURL }: any = doc.data();
          setUser({ displayName, email, uid, photoURL });
        });
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
