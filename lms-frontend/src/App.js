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

function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
            <RoleBasedDashboard userRole={user}/>
            </PrivateRoute>
          }

        />
        <Route path="/:course" element={<CoursePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
