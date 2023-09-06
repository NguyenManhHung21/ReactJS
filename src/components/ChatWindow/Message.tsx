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
}

const Wrapper = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .content {
    margin-left: 30px;
  }
`;
export default function Message(props: IMessageProps) {
  const { Text } = Typography;
  return (
    <Wrapper>
      <div>
        <Avatar size={"small"} src={props.photoURL}>
          {props.photoURL ? "" : props.displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Text className="author">{props.displayName}</Text>
        <Text className="date">{formatDate(props.createdAt?.seconds)}</Text>
      </div>
      <div>
        <Text className="content">{props.text}</Text>
      </div>
    </Wrapper>
  );
}
