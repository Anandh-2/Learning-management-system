import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/Sidebar.css';
import { FaHome } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { FaLayerGroup } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";




function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="side-head">
      <h1>EaseLearn</h1>
      </div>
      {user.role === "student" && (
        <ul className="options">
          <li><span className="opn"><FaHome/>Dashboard</span></li>
          <li><span className="opn"><FaBookOpen />Courses</span></li>
        </ul>
      )}
      {user.role === "instructor" && (
        <ul className="options">
          <li><span className="opn" onClick={()=>navigate('/instructor')}><FaHome/>Dashboard</span></li>
          <li><span className="opn" onClick={()=>navigate('courses')}><FaBookOpen />Courses</span></li>
        </ul>
      )}
      {user.role === "hod" && (
        <ul className="options">
          <li><span className="opn"><FaHome/>Dashboard</span></li>
          <li><span className="opn"><FaBookOpen />Courses</span></li>
          <li><span className="opn">Students</span></li>
          <li><span className="opn">Requests</span></li>
        </ul>
      )}
      {user.role === "admin" && (
        <ul className="options">
          <li><span className="opn" onClick={()=>navigate('/admin')}><FaHome/>Dashboard</span></li>
          <li><span className="opn" onClick={()=>navigate('/admin/departments')}><FaLayerGroup/>Departments</span></li>
          <li><span className="opn" onClick={()=>navigate('/admin/batches')}><FaGraduationCap/>Batches</span></li>
          <li><span className="opn"onClick={()=>navigate('/admin/academicYear')}><FaCalendar/>Academic Years</span></li>
          <li><span className="opn"onClick={()=>navigate('/admin/users')}><FaUserFriends />Users</span></li>
          <li><span className="opn" onClick={()=>navigate('/admin/courses')}><FaBookReader />Courses</span></li>
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
