import { Avatar, Button, Typography } from "antd";
import { signOut } from "firebase/auth";
import { styled } from "styled-components";
import { auth} from "../../firebase/config";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useFirestore } from "../../hooks/useFirestore";
import { IUser } from "../../typeChatApp";

export interface IUserInforProps {}

const WrapperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .info {
    display: flex;
    align-items: center;
  }
  .username {
    color: #fff;
    margin-left: 5px;
  }
`;

const { Text } = Typography;
export default function UserInfor(props: IUserInforProps) {
  // useEffect(() => {
  //   const q = query(collection(db, "users"));
  //   console.log(q);

  //   // get real time documents
  //   onSnapshot(q, (querySnapShot: any) => {
  //     const users: Array<UserInfo> = [];
  //     querySnapShot.forEach((doc: any) => users.push(doc.data()));
  //     console.log(users);
  //   });
  // }, []);
  const userSnapshot = useFirestore<IUser>('users');
  const { user, setUser }: any= useContext(AuthContext);
  const handleLogOut = () => {
    signOut(auth);
    setUser({});
  };
  return (
    <WrapperContainer>
      <div className="info">
        <Avatar src={user.photoURL}>{user.photoURL ? '' : user?.displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <Text className="username">{user.displayName}</Text>
      </div>
      <Button onClick={handleLogOut} ghost>
        Đăng xuất
      </Button>
    </WrapperContainer>
  );
}
