import "./App.css";
import InputBoard from "./Components/InputBoard";
import Search from "./Components/Search";
import StudentList from "./Components/StudentList";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { StudentContext } from "./StudentContext";
function App() {
  return (
    <StudentContext>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/liststudent" element={<StudentList />} />
          <Route path="/addstudent" element={<InputBoard />} />
          <Route path="/searchstudent" element={<Search />} />
        </Route>
      </Routes>
    </StudentContext>
  );
}

export default App;
