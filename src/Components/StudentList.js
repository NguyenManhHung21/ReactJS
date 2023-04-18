import { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../StudentContext";
import axios from "axios";
import moment from "moment";
import { Button, Modal } from "flowbite-react";

export default memo(function StudentList({ students }) {
  const [listStudents, setListStudents] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const handleDelCheckbox = () => {
    const alertDel = window.confirm("Bạn có chắc muốn xoá không?");
    if (alertDel) {
      try {
        axios
          .delete("/delCheckBox", { data: checkedCheckboxes })
          .then((res) => setListStudents(res.data))
          .catch((err) => console.log(err));
      } catch (error) {
        console.log("Error: " + error);
      }
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
  // console.log(checkedCheckboxes);

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
  // const modal = (id) => (
  //   <Modal show={true} size="md" popup={true} onClose={() => setShow(false)}>
  //     <Modal.Header />
  //     <Modal.Body>
  //       <div className="text-center">
  //         <div className="flex justify-center">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="w-14 h-14"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
  //             />
  //           </svg>
  //         </div>

  //         <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
  //           Are you sure you want to delete this student?
  //         </h3>
  //         <div className="flex justify-center gap-4">
  //           <Button color="failure" onClick={() => handleDelete(id)}>
  //             Yes, I'm sure
  //           </Button>
  //           <Button color="gray" onClick={() => setShow(false)}>
  //             No, cancel
  //           </Button>
  //         </div>
  //       </div>
  //     </Modal.Body>
  //   </Modal>
  // );

  useEffect(() => {
    try {
      axios.get("/listStd").then((res) => setListStudents(res.data));
    } catch (error) {
      console.log("Error: " + error);
    }
  }, [students]);
  // console.log(listStudents);
  return (
    <div className="mt-10">
      <table className="w-full text-sm text-gray-500 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6  h-20 w-52 text-xl ">
              <button
                onClick={handleDelCheckbox}
                className={`p-10 bg-red-600 py-add  rounded-md hover:opacity-70 text-white ${
                  checkedCheckboxes.length > 0 ? "inline-block" : "hidden"
                }`}
              >
                Xoá
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-xl">
              Mã SV
            </th>
            <th scope="col" className="px-6 py-3 text-xl">
              Tên SV
            </th>
            <th scope="col" className="px-6 py-3 text-xl">
              Ngày sinh
            </th>
            <th scope="col" className="px-6 py-3 text-xl">
              Giới tính
            </th>
            <th scope="col" className="px-6 py-3 text-xl">
              Khoa
            </th>
            <th scope="col" className="px-6 py-3 text-xl">
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
              <td className="px-6 py-4">
                {moment(student.birthday).format("MM/DD/YYYY")}
              </td>
              <td className="px-6 py-4">{student.gender}</td>
              <td className="px-6 py-4">{student.nameFaculty}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(student)}
                  className="mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  <Link to={"/addstudent"}>Sửa</Link>
                </button>
                <button
                  onClick={() => {
                    handleDelete(student.idStd);
                  }}
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
