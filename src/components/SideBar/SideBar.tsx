import { Col, Row } from "antd";
import * as React from "react";
import UserInfor from "./UserInfor";
import RoomList from "./RoomList";
import { styled } from "styled-components";

export interface ISideBarProps {}

const SidebarContainer = styled.div`
  background: #3f0e40;
  color: #fff;
  height: 100vh;
`;
export default function SideBar(props: ISideBarProps) {
  return (
    <SidebarContainer>
      <Row>
        <Col span={24}>
          <UserInfor />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarContainer>
  );
}
