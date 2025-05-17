import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import Layout from "./pages/Layout";
import Departments from "./pages/Departments";
import VideoPage from "./pages/VideoPage";
import Batch from "./pages/Batch";
import AcademicYear from "./pages/AcademicYear";
import AddAcademicYear from "./pages/AddAcadamicYear";
import Users from "./pages/Users";
import NewBatchCreation from "./pages/NewBatchCreation";
import CourseLayout from "./pages/CourseLayout";
import HODDashboard from "./pages/HODDashboard";
import InstructorCourses from "./pages/InstructorCourses";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentCourses from "./pages/StudentCourses";
import AdminCourses from "./pages/AdminCourses";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="batches" element={<Batch />} />
          <Route path="batches/new" element={<NewBatchCreation />} />
          <Route path="academicyear" element={<AcademicYear />} />
          <Route path="academicyear/new" element={<AddAcademicYear />} />
          <Route path="users" element={<Users />} />
          <Route path="courses" element={<AdminCourses/>}/>
        </Route>

        <Route path="/hod" element={<Layout />}>
          <Route index element={<HODDashboard />} />
          <Route path="courses" element={<InstructorCourses />} />
        </Route>

        <Route path="/instructor" element={<Layout />}>
          <Route index element={<InstructorDashboard />} />
          <Route path="courses" element={<InstructorCourses />} />
        </Route>

        <Route path="/student" element={<Layout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
        </Route>

        <Route path="/course" element={<CourseLayout />}>
          <Route index element={<div>Nothing open</div>} />
          <Route path="video/:contentId" element={<VideoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
