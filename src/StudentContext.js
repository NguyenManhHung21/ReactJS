import { createContext, useState } from "react";

export const UserContext = createContext({});

export function StudentContext({ children }) {
  const [student, setStudent] = useState({});
  return (
    <UserContext.Provider value={{ student, setStudent }}>
      {children}
    </UserContext.Provider>
  );
}
