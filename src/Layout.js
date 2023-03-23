import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="p-4 flex flex-col min-h-screenm">
      <Navigation />
      <Outlet />
    </div>
  );
}
