import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import Layout from "./pages/Layout";
import BatchDepartments from "./pages/BatchDepartments";
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
import SuccessfulRequest from "./pages/SuccessfulRequest";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import StudentPanel from "./pages/StudentPanel";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/successful-request" element={<SuccessfulRequest />} />
        <Route path="/unauthorized" element={<Unauthorized/>} />

        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Layout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="batches" element={<Batch />} />
          <Route path="batches/new" element={<NewBatchCreation />} />
          <Route path="batches/:batchId/departments" element={<BatchDepartments />} />
          <Route path="academicyear" element={<AcademicYear />} />
          <Route path="academicyear/new" element={<AddAcademicYear />} />
          <Route path="users" element={<Users mode={"users"}/>} />
          <Route path="requests" element={<Users mode={"requests"}/>} />
          <Route path="courses" element={<AdminCourses/>}/>
        </Route>

        <Route path="/hod" element={<ProtectedRoute allowedRoles={["hod"]}><Layout /></ProtectedRoute>}>
          <Route index element={<HODDashboard />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="users" element={<Users mode={"users"}/>} />
          <Route path="requests" element={<Users mode={"requests"}/>} />
        </Route>

        <Route path="/instructor" element={<ProtectedRoute allowedRoles={["instructor"]}><Layout /></ProtectedRoute>}>
          <Route index element={<InstructorDashboard />} />
          <Route path="courses" element={<InstructorCourses />} />
        </Route>

        <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><Layout /></ProtectedRoute>}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
        </Route>

        <Route path="/course/:courseId" element={<ProtectedRoute allowedRoles={["student","instructor","hod","admin"]}><CourseLayout /></ProtectedRoute>}>
          <Route index element={<div className="nothing">Nothing open</div>} />
          <Route path="module/:moduleId/video/:contentId" element={<VideoPage />} />
          <Route path="students" element={<StudentPanel/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
