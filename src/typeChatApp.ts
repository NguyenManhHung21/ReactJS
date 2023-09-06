import { UserInfo } from "firebase/auth";
import { FieldPath, Timestamp, WhereFilterOp } from "firebase/firestore";

export type IUser = Pick<
  UserInfo,
  "displayName" | "email" | "uid" | "photoURL"
>;

export interface AuthContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | {}>>;
}

export interface IOption {
    photoURL: string,
    uid: string,
    label: string
}

export interface IConditionRef {
  fieldName: string | FieldPath;
  operator: WhereFilterOp;
  compareValue: any;
}

export type IMessage = Pick<
  UserInfo,
  "displayName" | "uid" | "photoURL"
> & {text: string, roomId: string, createdAt: Timestamp};
