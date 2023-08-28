import { Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { auth } from "../firebase/config";
import { FacebookAuthProvider, getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { addDocument } from "../firebase/services";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const navigate = useNavigate();
  const { user }: any = React.useContext(AuthContext);
  console.log(user);
  
  useEffect(() => {
    if (user.email) navigate("/");
  }, [user, navigate]);

  const provider = new FacebookAuthProvider();
  const handleFbLogin = () => {
    // getAdditionalUserInfo()
    signInWithPopup(auth, provider).then((results) => {
      if(getAdditionalUserInfo(results)?.isNewUser) {
        // ghi dữ liệu vào trong firestore db
        addDocument('users', results.user.email as string, {
          displayName: results.user.displayName,
          email: results.user.email,
          photoURL: results.user.photoURL,
          uid: results.user.uid,
          providerId: results.providerId
        })
      }
      
    })
  };

  return (
    <div>
      <Row justify={"center"} style={{ height: "800px" }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button onClick={handleFbLogin} style={{ width: "100%" }}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
