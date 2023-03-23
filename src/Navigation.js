import { useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Navigation() {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (e) => {
    setActiveLink(e.target.textContent);
  };
  return (
    <div className="pb-8">
      <h1 className="mb-9 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl">
        Danh sách Sinh Viên
      </h1>
      <ul className="flex justify-center p-3 w-full border-gray-100 rounded-lg flex-row space-x-16 mt-0 text-lg font-extrabold border-0 bg-slate-100">
        <li>
          <Link
            onClick={handleLinkClick}
            to="/liststudent"
            className={`block py-2 px-14 bg-blue-700 rounded bg-transparent hover:text-blue-700 ${
              activeLink === "Hiển thị danh sách"
                ? "text-blue-700"
                : "text-gray-700 "
            }`}
          >
            Hiển thị danh sách
          </Link>
        </li>
        <li>
          <Link
            onClick={handleLinkClick}
            to="/addstudent"
            className={`block py-2 px-14 rounded hover:text-blue-700 ${
              activeLink === "Thêm sinh viên"
                ? "text-blue-700"
                : "text-gray-700 "
            }`}
          >
            Thêm sinh viên
          </Link>
        </li>
        <li>
          <Link
            onClick={handleLinkClick}
            to="/searchstudent"
            className={`block py-2 px-14 rounded  hover:text-blue-700 ${
              activeLink === "Tìm kiếm sinh viên"
                ? "text-blue-700"
                : "text-gray-700 "
            }`}
          >
            Tìm kiếm sinh viên
          </Link>
        </li>
      </ul>
    </div>
  );
}
