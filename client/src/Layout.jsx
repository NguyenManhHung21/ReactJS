import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="py-4 mx-14 px-8 flex flex-col min-h-screen">
      <Header />
      <hr className="-mx-24 mt-4" />
      <Outlet />
    </div>
  );
}
