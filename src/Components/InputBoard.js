import { useEffect, useRef, useState, memo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getIdInput } from "../redux/actions";
import { todoEditSelector } from "../redux/selector";
import { UserContext } from "../StudentContext";
import StudentList from "./StudentList";
import axios from "axios";

export default memo(function InputBoard() {
  const [idStd, setIdStd] = useState("");
  const [nameStd, setNameStd] = useState("");
  const [birthday, setBirthday] = useState("");
  const [genderChecked, setGenderChecked] = useState("");
  const [idFaculty, setIdFaculty] = useState("");
  const [listStudents, setListStudents] = useState([]);
  const [listFaculties, setListFaculties] = useState([]);
  const handleUpdate = () => {
    try {
      axios.put(`/update-${idStd}`, {
        idStd,
        nameStd,
        birthday,
        gender: genderChecked,
        idFaculty,
      });
      loadData();
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  //REDUX
  // const todoEdit = useSelector(todoEditSelector);
  // useEffect(() => {
  //   setIdStd(todoEdit.id);
  //   setNameStd(todoEdit.name);
  //   setBirthday(todoEdit.birthday);
  //   setGenderChecked(todoEdit.gender);
  //   setIdFaculty(todoEdit.idFaculty);
  // }, [todoEdit]);

  //useContext
  const { student } = useContext(UserContext);
  useEffect(() => {
    setIdStd(student.idStd);
    setNameStd(student.nameStd);
    setBirthday(student.birthday);
    setGenderChecked(student.gender);
    setIdFaculty(student.idFaculty);
  }, [student]);

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7168/api/Faculties")
        .then((res) => setListFaculties(res.data));
      axios.get("/listStd").then((res) => setListStudents(res.data));
    } catch (error) {
      console.log("Error: " + error);
    }
  }, []);

  const loadData = () => {
    axios.get("/listStd").then((res) => setListStudents(res.data));
  };

  const handleAddStudent = async () => {
    if (
      nameStd === undefined ||
      birthday === undefined ||
      genderChecked === undefined ||
      idFaculty === undefined
    ) {
      alert("Yêu cầu nhập đầy đủ các trường!!");
      return;
    }
    try {
      await axios.post("/addDefault", {
        nameStd,
        birthday,
        gender: genderChecked,
        idFaculty,
      });
      loadData();
    } catch (error) {
      console.log("Error: " + error);
    }

    setNameStd("");
    setBirthday("");
    setGenderChecked("");
    setIdFaculty("");
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
                  checked={genderChecked === "Nam"}
                  value="Nam"
                  onChange={(e) => setGenderChecked(e.target.value)}
                  id="male"
                />{" "}
                <label className="mr-3" htmlFor="male">
                  Nam
                </label>
                <input
                  type="radio"
                  name=""
                  checked={genderChecked === "Nu"}
                  value="Nu"
                  onChange={(e) => setGenderChecked(e.target.value)}
                  id="female"
                />{" "}
                <label className="mr-3" htmlFor="female">
                  Nữ
                </label>
              </td>
              <td className="px-6">
                <select
                  value={idFaculty}
                  name=""
                  id="idFaculty"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-add px-3"
                  onChange={(e) => setIdFaculty(e.target.value)}
                >
                  <option value="">-- Khoa --</option>
                  {listFaculties.map((faculty) => (
                    <option key={faculty.idFaculty} value={faculty.idFaculty}>
                      {faculty.nameFaculty}
                    </option>
                  ))}
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
