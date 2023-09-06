import * as React from "react";
import { useFirestore } from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";
import { IRooms } from "../components/SideBar/RoomList";
import { IConditionRef, IUser } from "../typeChatApp";

export interface IAppProviderProps {
  children: React.ReactNode;
}

export const AppContext = React.createContext({});

export default function AppProvider(props: IAppProviderProps) {
  const { user }: { user: IUser } = React.useContext<any>(AuthContext);
  const [selectedRoomId, setselectedRoomId] = React.useState("");
  const [newMenbers, setNewMenbers] = React.useState<Array<string>>([]);

  const roomsCondition: IConditionRef = React.useMemo(
    () => ({
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    }),
    [user.uid]
  );

  //lấy ra tất cả các phòng có chứa user.uid
  const rooms: Array<IRooms> = useFirestore<IRooms>("rooms", roomsCondition);

  const selectedRoom: IRooms = React.useMemo<any>(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [selectedRoomId, rooms]
  );

  const usersCondition: IConditionRef | undefined = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom]);

  //chọc vào collection user và lấy ra tất cả các uid của user. uid của user nào mà nằm trong selectedRoom.members thì ta sẽ lấy ra uid user đó và nhét vào trong 1 mảng
  // lấy ra những user có uid nằm trong selectedRoom.members
  const members: Array<IUser> = useFirestore<IUser>("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        selectedRoom,
        setselectedRoomId,
        members,
        newMenbers,
        setNewMenbers,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
