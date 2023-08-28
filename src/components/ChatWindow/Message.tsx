import { Avatar, Typography } from "antd";
import * as React from "react";
import { styled } from "styled-components";

export interface IMessageProps {
  text: string;
  displayName: string;
  createdAt: string;
  photoURL: string;
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
        <Avatar size={'small'}>{props.photoURL}</Avatar>
        <Text className="author">{props.displayName}</Text>
        <Text className="date">{props.createdAt}</Text>
      </div>
      <div>
        <Text className="content">{props.text}</Text>
      </div>
    </Wrapper>
  );
}
