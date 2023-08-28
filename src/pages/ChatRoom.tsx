import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Col, Row, Spin } from "antd";
import SideBar from "../components/SideBar/SideBar";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { LoadingOutlined } from "@ant-design/icons";

export interface IChatRoomProps {}

export default function ChatRoom(props: IChatRoomProps) {
  const [isLoading, setIsLoading] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { user }: any = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.email) navigate("/login");
    else setIsLoading(false);
  }, [user, navigate]);

  return (
    <div>
      {isLoading ? (
        <Spin
          tip="Loading..."
          indicator={antIcon}
          size="large"
          style={{ top: "200px" }}
        >
          <div className="content" />
        </Spin>
      ) : (
        <Row>
          <Col span={6}>
            <SideBar />
          </Col>
          <Col span={18}>
            <ChatWindow />
          </Col>
        </Row>
      )}
    </div>
  );
}
