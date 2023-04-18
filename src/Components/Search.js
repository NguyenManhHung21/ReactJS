import { useContext, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import StudentList from "./StudentList";
import axios from "axios";
import { UserContext } from "../StudentContext";
import { Link } from "react-router-dom";

export default function Search() {
  const [search, setSearch] = useState("");
  const [listStudents, setListStudents] = useState([]);
  const { setStudent } = useContext(UserContext);

  const [stdSearch, setStdSearch] = useState({});
  const [show, setShow] = useState(false);
  // const dispatch = useDispatch() //có tac dụng để đẩy dữ liệU lên store
  // const testSelector = useSelector(state => state.test); // có tác dụng là lấy dữ liệu từ store
  // console.log(testSelector);
  // const handleTest = () => {
  //   // console.log();
  // };

  useEffect(() => {
    try {
      axios.get("/listStd").then((res) => setListStudents(res.data));
    } catch (error) {
      console.log("Error: " + error);
    }
  }, []);
  // useEffect(() => {
  //   let show = false;
  //   listStudents.forEach((student) => {
  //     if (student.idStd === search) {
  //       setStdSearch(student);
  //       show = true;
  //       console.log("tim thay");
  //     }
  //   });
  //   setShow(show);
  // }, [search]);
  const handleEdit = (student) => {
    setStudent(student);
  };
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete");
    try {
      if (confirm)
        axios
          .delete(`/delStudent-${id}`)
          .then((res) => setListStudents(res.data));
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  const handleSearch = () => {
    let show = false;
    listStudents.forEach((student) => {
      if (student.idStd == search) {
        setStdSearch(student);
        show = true;
        console.log("tim thay");
      }
    });
    setShow(show);
  };
  return (
    <div>
      <div className="max-w-2xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Nhập ID Sinh Viên cần tìm..."
            required
          />
          <button
            onClick={handleSearch}
            type="button"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
        {/* <button className="border bg-red-300" onClick={handleTest}>
          Test
        </button> */}
      </div>
      <div className="mt-10">
        {show && (
          <table className="w-full text-sm text-gray-500 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã SV
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên SV
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày sinh
                </th>
                <th scope="col" className="px-6 py-3">
                  Giới tính
                </th>
                <th scope="col" className="px-6 py-3">
                  Khoa
                </th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4  text-gray-900 whitespace-nowrap">
                  {stdSearch.idStd}
                </td>
                <td className="px-6 py-4">{stdSearch.nameStd}</td>
                <td className="px-6 py-4">{stdSearch.birthday}</td>
                <td className="px-6 py-4">{stdSearch.genderChecked}</td>
                <td className="px-6 py-4">{stdSearch.faculty}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(stdSearch)}
                    className="mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    <Link to={"/addstudent"}>Sửa</Link>
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(stdSearch.idStd);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}{" "}
        {!show && <StudentList />}
      </div>
    </div>
  );
}
