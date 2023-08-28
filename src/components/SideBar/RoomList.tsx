import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps } from "antd";
import Link from "antd/es/typography/Link";
import * as React from "react";
import { styled } from "styled-components";
import { AuthContext } from "../../AuthProvider";
import { IConditionRef, useFirestore } from "../../hooks/useFirestore";

export interface IRoomListProps {
  
}

interface IRooms {
  member: Array<string>,
  name: string,
  createdAt: string,
  description: string,
  id: string
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
  const { user }: any = React.useContext(AuthContext);

  const roomsCondition: IConditionRef = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.uid]);
  
  const rooms = useFirestore<IRooms>("rooms", roomsCondition);
  console.log({ rooms });

  const Rooms = () => (
    <LinkContainer>
      {/* <Link href="">Room 1</Link>
      <Link href="">Room 2</Link>
      <Link href="">Room 3</Link> */}
      {
        rooms?.map(room => (<Link key={room.id} href="">{room?.name}</Link>))
      }
      <Button type="text" className="add-room" icon={<PlusSquareOutlined />}>
        Thêm phòng
      </Button>
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
    <CollapseStyled ghost items={items} defaultActiveKey={["room-chat"]} />
  );
}
