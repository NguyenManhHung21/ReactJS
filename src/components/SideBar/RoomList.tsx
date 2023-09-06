import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Form } from "antd";
import Link from "antd/es/typography/Link";
import * as React from "react";
import { styled } from "styled-components";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
import AddRoomModal from "../Modals/AddRoomModal";
import { addDocument } from "../../firebase/services";
import { IUser } from "../../typeChatApp";

export interface IRoomListProps {}

export interface IRooms {
  members: Array<string>;
  name: string;
  createdAt: string;
  description: string;
  id: string;
}
const CollapseStyled = styled(Collapse)`
  &&& {
    // tài trợ bởi styled-components
    // để áp đặt sự ưu tiên lên class mà bạn muốn
    .ant-collapse-header,
    p {
      color: #fff;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  .add-room {
    color: #fff;
    margin-top: 5px;
  }
`;

export default function RoomList(props: IRoomListProps) {
  const [isShowModal, setIsShowModal] = React.useState(false);
  const {
    rooms,
    setselectedRoomId,
  }: {
    rooms: Array<IRooms>;
    setselectedRoomId: React.Dispatch<React.SetStateAction<string>>;
  } = React.useContext<any>(AppContext);
  const {
    user,
  }: {
    user: IUser;
  } = React.useContext<any>(AuthContext);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [user.uid] });
    form.resetFields();

    setIsShowModal(false);
  };
  const handleCancel = () => {
    setIsShowModal(false);
  };

  const Rooms = () => (
    <LinkContainer>
      {rooms?.map((room) => (
        <Link
          key={room.id}
          onClick={() => {
            setselectedRoomId(room.id);
          }}
        >
          {room.name}
        </Link>
      ))}
      <Button
        type="text"
        className="add-room"
        icon={<PlusSquareOutlined />}
        onClick={handleOpenModal}
      >
        Thêm phòng
      </Button>
      <AddRoomModal
        form={form}
        isShowModal={isShowModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </LinkContainer>
  );
  const items: CollapseProps["items"] = [
    {
      key: "room-chat",
      label: "Danh Sách Các Phòng",
      children: <Rooms />,
    },
  ];
  return (
    <>
      <CollapseStyled ghost items={items} defaultActiveKey={["room-chat"]} />
    </>
  );
}
