import { useEffect, useRef, useState, memo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getIdInput } from "../redux/actions";
import { todoEditSelector } from "../redux/selector";
import { UserContext } from "../StudentContext";
import StudentList from "./StudentList";

export default memo(function InputBoard() {
  const [idStd, setIdStd] = useState("");
  const [nameStd, setNameStd] = useState("");
  const [birthday, setBirthday] = useState("");
  const [genderChecked, setGenderChecked] = useState("");
  const [faculty, setFaculty] = useState("");
  const [listStudents, setListStudents] = useState([]);
  const id = useRef();
  const handleUpdate = () => {
    id.current.disabled = false;
    const studentsStorage = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    studentsStorage.forEach((student, index) => {
      if (student.idStd === idStd) {
        studentsStorage[index] = {
          idStd,
          nameStd,
          birthday,
          genderChecked,
          faculty,
        };
      }
    });

    localStorage.setItem("students", JSON.stringify(studentsStorage));
    setListStudents(studentsStorage);
  };
  //redux
  // const todoEdit = useSelector(todoEditSelector);
  // useEffect(() => {
  //   setIdStd(todoEdit.id);
  //   setNameStd(todoEdit.name);
  //   setBirthday(todoEdit.birthday);
  //   setGenderChecked(todoEdit.gender);
  //   setFaculty(todoEdit.faculty);
  // }, [todoEdit]);

  //useContext
  const { student } = useContext(UserContext);
  useEffect(() => {
    setIdStd(student.idStd);
    setNameStd(student.nameStd);
    setBirthday(student.birthday);
    setGenderChecked(student.genderChecked);
    setFaculty(student.faculty);
  }, [student]);

  const handleAddStudent = () => {
    if (
      idStd === "" ||
      nameStd === "" ||
      birthday === "" ||
      genderChecked === "" ||
      faculty === ""
    ) {
      alert("Yêu cầu nhập đầy đủ các trường!!");
      return true;
    }
    const studentsStorage = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    if (studentsStorage.some((student) => student.idStd === idStd)) {
      alert(`ID: ${idStd} đã tồn tại. Yêu cầu nhập ID khác!!`);
      id.current.className =
        "text-red-600 border border-red-600 bg-gray-50 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-add px-2";
      return;
    } else {
      id.current.className =
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-add px-2";
      id.current.focus();
    }

    const newStudent = {
      idStd,
      nameStd,
      birthday,
      genderChecked,
      faculty,
    };
    setListStudents([...studentsStorage, newStudent]);

    localStorage.setItem(
      "students",
      JSON.stringify([...studentsStorage, newStudent])
    );
    setIdStd("");
    setNameStd("");
    setBirthday("");
    setGenderChecked("");
    setFaculty("");
  };
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="text-white mb-3">
          <button
            className="bg-red-600 py-add px-5 rounded-md hover:opacity-70"
            onClick={handleAddStudent}
          >
            Thêm
          </button>
          <button
            onClick={handleUpdate}
            className="ml-3 bg-red-600 py-add px-5 rounded-md hover:opacity-70"
          >
            Cập nhật
          </button>
        </div>
        <table className="text-center">
          <thead>
            <tr>
              <th className="py-3 border-r">
                Mã SV<span className="text-red-600">*</span>
              </th>
              <th className="py-3 border-r">
                Tên SV<span className="text-red-600">*</span>{" "}
              </th>
              <th className="py-3 border-r">Ngày sinh</th>
              <th className="py-3 border-r">Giới tính</th>
              <th className="py-3 ">
                Khoa<span className="text-red-600">*</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6">
                <input
                  ref={id}
                  // disabled={todoEdit.id}
                  disabled={student.idStd}
                  value={idStd || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-add px-2"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setIdStd(e.target.value)}
                />
              </td>
              <td className="px-6">
                <input
                  value={nameStd || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-add px-2"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setNameStd(e.target.value)}
                />
              </td>

              <td className="px-6">
                <input
                  value={birthday || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-add px-2"
                  type="date"
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </td>
              <td className="px-6">
                <input
                  type="radio"
                  name=""
                  checked={genderChecked === "Nữ"}
                  value="Nữ"
                  onChange={(e) => setGenderChecked(e.target.value)}
                  id="male"
                />{" "}
                <label className="mr-3" htmlFor="male">
                  Nam
                </label>
                <input
                  type="radio"
                  name=""
                  checked={genderChecked === "Nam"}
                  value="Nam"
                  onChange={(e) => setGenderChecked(e.target.value)}
                  id="female"
                />{" "}
                <label className="mr-3" htmlFor="female">
                  Nữ
                </label>
                <input
                  type="radio"
                  name=""
                  checked={genderChecked === "Giới tính khác"}
                  value="Giới tính khác"
                  onChange={(e) => setGenderChecked(e.target.value)}
                  id="others"
                />{" "}
                <label className="mr-3" htmlFor="others">
                  Khác
                </label>
              </td>
              <td className="px-6">
                <select
                  value={faculty || ""}
                  name=""
                  id="faculty"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-add px-3"
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  <option value="">-- Khoa --</option>
                  <option value="CNTT">CNTT</option>
                  <option value="QTKD">QTKD</option>
                  <option value="KHMT">KHMT</option>
                  <option value="TĐH">TĐH</option>
                  <option value="HTTT">HTTT</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {localStorage.getItem("students") && (
        <StudentList students={listStudents} />
      )}
    </div>
  );
});
