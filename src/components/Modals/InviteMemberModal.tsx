import { Form, Modal } from "antd";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DebounceSelect from "./conponents/DebounceSelect";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { IOption } from "../../typeChatApp";
import { isEmpty } from "lodash";
import { AppContext } from "../../Context/AppProvider";
import { IRooms } from "../SideBar/RoomList";

export interface IInviteMemberModalProps {
  form: any;
  showInviteModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function InviteMemberModal(props: IInviteMemberModalProps) {
  const [fetching, setFetching] = useState(false);
  const [value, setValue] = useState<Array<IOption>>([]);
  const { setNewMenbers, selectedRoom }: {setNewMenbers: Dispatch<SetStateAction<Array<string>>>, selectedRoom: IRooms}= useContext<any>(AppContext);
  const fetchUserList = (search: string) => {
    setFetching(true);
    const q = query(
      collection(db, "users"),
      where("keywords", "array-contains", search),
      orderBy("displayName"),
      limit(20)
    );

    onSnapshot(q, (querySnapshot: any) => {
      const data: Array<IOption> = [];
      querySnapshot.forEach((doc: any) => {
        data.push({
          label: doc.data().displayName,
          uid: doc.data().uid,
          photoURL: doc.data().photoURL,
        });
      });
      data.filter((member: IOption) => !selectedRoom.members.includes(member.uid));
      if (!isEmpty(data)) {
        setValue(data);
        setFetching(false);
      }
    });
  };
  
  const handleSelect = (newValue: Array<string>) => {
    setNewMenbers(newValue);
  };
  return (
    <div>
      <Modal
        title="Thêm thành viên"
        open={props.showInviteModal}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <Form form={props.form}>
          <DebounceSelect
            fetching={fetching}
            debounceTimeout={300}
            handleChangeSelect={handleSelect}
            fetchOptions={fetchUserList}
            value={value}
          />
        </Form>
      </Modal>
    </div>
  );
}
