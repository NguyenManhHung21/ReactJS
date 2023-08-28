import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import * as React from "react";
import { styled } from "styled-components";
import Message from "./Message";

export interface IChatWindowProps {}
const WrapperContainer = styled.div`
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 36px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;
const MessageList = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;
const MessageContent = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin: 0;
  }
`;
export default function ChatWindow(props: IChatWindowProps) {
  return (
    <WrapperContainer>
      <Header>
        <div className="header__info">
          <p className="header__title">Room 1</p>
          <span className="header__description">Day la </span>
        </div>
        <ButtonGroup>
          <Button type="text" icon={<UserAddOutlined />}>
            Mời
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title={"A"}>
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title={"B"}>
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title={"C"}>
              <Avatar>C</Avatar>
            </Tooltip>
            <Tooltip title={"D"}>
              <Avatar>D</Avatar>
            </Tooltip>
          </Avatar.Group>
        </ButtonGroup>
      </Header>
      <MessageContent>
        <MessageList>
          <Message
            text={"Test"}
            photoURL={"photo"}
            displayName={"Nguyen Manh Hung"}
            createdAt={"27-03-2023"}
          />
          <Message
            text={"Test"}
            photoURL={"photo"}
            displayName={"Nguyen Manh Hung"}
            createdAt={"27-03-2023"}
          />
          <Message
            text={"Test"}
            photoURL={"photo"}
            displayName={"Nguyen Manh Hung"}
            createdAt={"27-03-2023"}
          />
          <Message
            text={"Test"}
            photoURL={"photo"}
            displayName={"Nguyen Manh Hung"}
            createdAt={"27-03-2023"}
          />
          <Message
            text={"Test"}
            photoURL={"photo"}
            displayName={"Nguyen Manh Hung"}
            createdAt={"27-03-2023"}
          />
        </MessageList>
        <FormStyled>
          <Form.Item>
            <Input placeholder="Nhập tin nhắn" bordered={false}/>
          </Form.Item>
          <Button size="large" icon={<SendOutlined />} type="primary"/>
        </FormStyled>
      </MessageContent>
    </WrapperContainer>
  );
}
