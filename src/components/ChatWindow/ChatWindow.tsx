import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import { Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import { styled } from "styled-components";
import { IRooms } from "../SideBar/RoomList";
import { AppContext } from "../../Context/AppProvider";
import InviteMemberModal from "../Modals/InviteMemberModal";
import { isEmpty } from "lodash";
import { IConditionRef, IMessage, IUser } from "../../typeChatApp";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import { useFirestore } from "../../hooks/useFirestore";
import Message from "./Message";
import { addDocument } from "../../firebase/services";
import { formatRelative } from "date-fns";

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
  padding: 0 25px;
`;
const MessageContent = styled.div`
  height: calc(100% - 90px);
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

export const formatDate = (seconds: number | null) => {
  let formatedDate = "";

  if (seconds) {
    formatedDate = formatRelative(new Date(seconds * 1000), new Date());

    formatedDate = formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
  }
  return formatedDate;
};
export default function ChatWindow(props: IChatWindowProps) {
  const {
    selectedRoom,
    members,
    newMenbers,
    setNewMenbers,
  }: {
    selectedRoom: IRooms;
    members: Array<IUser & { id: string }>;
    newMenbers: Array<string>;
    setNewMenbers: Dispatch<SetStateAction<Array<string>>>;
  } = useContext<any>(AppContext);
  const {
    user: { uid, photoURL, displayName },
  }: { user: IUser } = useContext<any>(AuthContext);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const [formInput] = Form.useForm();
  const handleOk = async () => {
    const membersRef = doc(db, "rooms", selectedRoom.id);
    await updateDoc(membersRef, {
      members: arrayUnion(...newMenbers),
    });
    setShowInviteModal(false);
    setNewMenbers([]);
  };
  const handleCancel = () => {
    setShowInviteModal(false);
  };
  const handleIpChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      displayName,
      roomId: selectedRoom.id,
    });
    formInput.resetFields(["message"]);
  };

  const conditionMes: IConditionRef = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  // lấy ra document messages có roomId là selectedRoom.id
  const messages: Array<IMessage> = useFirestore<IMessage>(
    "messages",
    conditionMes
  );
  return (
    <WrapperContainer>
      {isEmpty(selectedRoom) ? (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
        />
      ) : (
        <Header>
          <div className="header__info">
            <p className="header__title">{selectedRoom?.name}</p>
            <span className="header__description">
              {selectedRoom?.description}
            </span>
          </div>
          <ButtonGroup>
            <Button
              onClick={() => setShowInviteModal(true)}
              type="text"
              icon={<UserAddOutlined />}
            >
              Mời
            </Button>
            <Avatar.Group size="small" maxCount={2}>
              {members.map((member) => (
                <Tooltip title={member.displayName} key={member.id}>
                  <Avatar src={member.photoURL}>
                    {member.photoURL
                      ? ""
                      : member.displayName?.charAt(0).toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </ButtonGroup>
        </Header>
      )}
      <InviteMemberModal
        form={form}
        showInviteModal={showInviteModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <MessageContent>
        <MessageList>
          {messages.map((mes: IMessage, index: number) => (
            <Message
              isUserLogined={mes.uid === uid}
              key={`${mes.roomId}-${index}`}
              text={mes.text}
              photoURL={mes.photoURL}
              displayName={mes.displayName}
              createdAt={mes.createdAt}
            />
          ))}
        </MessageList>
        <FormStyled form={formInput}>
          <Form.Item name="message">
            <Input
              value={inputValue}
              onChange={handleIpChange}
              onPressEnter={handleOnSubmit}
              placeholder="Nhập tin nhắn"
              bordered={false}
            />
          </Form.Item>
          <Button
            onClick={handleOnSubmit}
            size="large"
            icon={<SendOutlined />}
            type="primary"
          />
        </FormStyled>
      </MessageContent>
    </WrapperContainer>
  );
}
