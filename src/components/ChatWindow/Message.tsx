import { Avatar, Typography } from "antd";
import * as React from "react";
import { styled } from "styled-components";
import { formatDate } from "./ChatWindow";
import { Timestamp } from "firebase/firestore";

export interface IMessageProps {
  text: string;
  displayName: string | null;
  createdAt: Timestamp;
  photoURL: string | null;
  isUserLogined: boolean;
}

const Wrapper = styled.div`
  margin-bottom: 10px;
  .userlogin {
    display: flex;
    justify-content: flex-end;
  }
  .detail-info {
    display: flex;
    justify-content: flex-end;
  }
  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .text-content {
    max-width: 70%;
  }
  .content {
    margin-left: 30px;
  }
  .userlogin-content {
    float: right;
  }
`;
export default function Message(props: IMessageProps) {
  const { Text } = Typography;

  return (
    <Wrapper>
      <div className={`${props.isUserLogined ? "userlogin" : ""}`}>
        <div>
          <div className={`${props.isUserLogined ? "detail-info" : ""}`}>
            <Avatar size={"small"} src={props.photoURL}>
              {props.photoURL ? "" : props.displayName?.charAt(0).toUpperCase()}
            </Avatar>
            <Text className="author">{props.displayName}</Text>
            <Text className="date">{formatDate(props.createdAt?.seconds)}</Text>
          </div>
          <div
            className={`${
              props.isUserLogined ? "userlogin-content" : ""
            } text-content`}
          >
            <Text className={` content`}>{props.text}</Text>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
