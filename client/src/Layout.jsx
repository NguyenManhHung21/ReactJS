import { Outlet } from "react-router-dom";
import Header from "./Header";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function Layout() {
  return (
    <div className="py-4 mx-14 px-8 flex flex-col min-h-screen">
      <ToastContainer />
      <Header />
      <hr className="-mx-24 mt-4" />
      <Outlet />
    </div>
  );
}
