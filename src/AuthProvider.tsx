import { User, UserInfo, onAuthStateChanged } from "firebase/auth";
import { useState, createContext, ReactNode, useEffect } from "react";
import { auth, db } from "./firebase/config";
import { DocumentSnapshot, doc, onSnapshot } from "firebase/firestore";

export interface IAuthProviderProps {
  children: ReactNode;
}

// export interface IUser {
//   displayName: string | null;
//   email: string | null;
//   uid: string | null;
//   photoURL: string | null;
// }
export type IUser = Pick<
  UserInfo,
  "displayName" | "email" | "uid" | "photoURL"
>;

export interface AuthContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | {}>>;
}
export const AuthContext = createContext({});

export default function AuthProvider(props: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>({
    displayName: null,
    email: null,
    uid: "",
    photoURL: null,
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user: IUser | null) => {
      if (user) {
        // get real-time a document
        onSnapshot(
          doc(db, "users", user.email as string),
          (doc) => {
            const { displayName, email, uid, photoURL }: any= doc.data();
            setUser({ displayName, email, uid, photoURL });
          }
        );
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
