import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import PrivateRoute from './components/PrivateRoute';
import StudentDashboard from './pages/StudentDashboard';
import CoursePage from './pages/CoursePage';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';
import RoleBasedDashboard from './components/RoleBasedDashboard';
import CourseEditor from './pages/CourseEditor';
import Layout from './pages/Layout';
import Departments from './pages/Departments';
import Videopage from './pages/Videopage';
import Batch from './pages/Batch';
import AcademicYear from './pages/AcademicYear';
import AddAcademicYear from './pages/AddAcadamicYear';
import Users from './pages/Users';
import NewBatchCreation from './pages/NewBatchCreation';
import Course from './components/Course';


function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      <Routes>
      {user ?
        <Route path="/" element={<Layout/>}>
          <Route index element={<RoleBasedDashboard userRole={user.role}/>}/>
          <Route path='departments' element={<Departments/>}/>
          <Route path='videopage' element={<Videopage/>}/>
          <Route path='batches' element={<Batch/>}/>
          <Route path='batches/new' element={<NewBatchCreation/>}/>
         <Route path="/academicYear" element={<AcademicYear />} />
         <Route path="/academicYear/new" element={<AddAcademicYear />} />
          <Route path='/users' element={<Users/>}/>
          <Route path='/course' element={<Course/>}/>
        </Route>:
        <Route path="/" element={<Welcome/>}/>
      }
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
