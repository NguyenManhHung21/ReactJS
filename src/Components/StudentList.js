import { memo, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../StudentContext";
import { todoEdit } from "../redux/actions";
export default memo(function StudentList({ students }) {
  const [listStudents, setListStudents] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  const handleDelCheckbox = () => {
    const alertDel = window.confirm("Bạn có chắc muốn xoá không?");
    if (alertDel) {
      const studentsStorage = localStorage.getItem("students")
        ? JSON.parse(localStorage.getItem("students"))
        : [];

      const newStudents = [];
      studentsStorage.forEach((student) => {
        if (!checkedCheckboxes.includes(student.idStd))
          newStudents.push(student);
      });
      localStorage.setItem("students", JSON.stringify(newStudents));
      setListStudents(newStudents);
    }
  };
  const handleCheck = (event, student) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckedCheckboxes((prev) => [...prev, student.idStd]);
    } else {
      setCheckedCheckboxes((prev) => {
        return [...prev, student.idStd].filter((id) => id !== student.idStd);
      });
    }
  };
  useEffect(() => {
    const studentsStorage = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    setListStudents(studentsStorage);
  }, [students]);

  // const handleEdit = (student) => {
  //   if (idInput) idInput.current.disabled = true;
  //   const url = `/addstudent?id=${student.idStd}&name=${student.nameStd}&birthday=${student.birthday}&gender=${student.genderChecked}&faculty=${student.faculty}`;
  //   navigate(url);
  // };

  // redux
  // const dispatch = useDispatch();
  // const handleEdit = (student) => {
  //   dispatch(
  //     todoEdit({
  //       id: student.idStd,
  //       name: student.nameStd,
  //       birthday: student.birthday,
  //       gender: student.genderChecked,
  //       faculty: student.faculty,
  //     })
  //   );
  // };

  const { setStudent } = useContext(UserContext);
  //useContext
  const handleEdit = (student) => {
    setStudent(student);
  };
  const handleDelete = (id) => {
    const alertDel = window.confirm("Bạn có chắc muốn xoá không?");
    if (alertDel) {
      const newList = listStudents.filter((student) => student.idStd !== id);
      localStorage.setItem("students", JSON.stringify(newList));
      setListStudents(newList);
    }
  };
  return (
    <div className="mt-10">
      <div className="mb-2 text-center">
        <button
          onClick={handleDelCheckbox}
          className={`ml-3 bg-red-600 py-add px-5 rounded-md hover:opacity-70 text-white ${
            checkedCheckboxes.length > 0 ? "inline-block" : "hidden"
          }`}
        >
          Xoá checkbox
        </button>
      </div>
      <table className="w-full text-sm text-gray-500 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="p-4"></th>
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
          {listStudents.map((student) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={student.idStd}
            >
              <td className="w-4 p-4">
                <input
                  checked={checkedCheckboxes.includes(student.idStd)}
                  onChange={(event) => handleCheck(event, student)}
                  id=""
                  type="checkbox"
                  className="ml-16 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4  text-gray-900 whitespace-nowrap">
                {student.idStd}
              </td>
              <td className="px-6 py-4">{student.nameStd}</td>
              <td className="px-6 py-4">{student.birthday}</td>
              <td className="px-6 py-4">{student.genderChecked}</td>
              <td className="px-6 py-4">{student.faculty}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(student)}
                  className="mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  <Link to={"/addstudent"}>Sửa</Link>
                </button>
                <button
                  onClick={() => handleDelete(student.idStd)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
