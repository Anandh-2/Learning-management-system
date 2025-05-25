import React, {useState} from "react";
import ProfileDropDown from "./ProfileDropdown";
import '../styles/Header.css';
import { useLocation } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    setIsOpen(false);
  };

  const getTitle = ()=>{
    if(location.pathname.includes('/admin/departments')) return 'Departments';
    else if(location.pathname.includes('/admin/batches')) return 'Batches';
    else if(location.pathname.includes('/admin/academicyear')) return 'Academic Year';
    else if(location.pathname.includes('/admin/users')) return 'Users';
    else if(location.pathname.includes('/admin/requests'||location.pathname.includes('/hod/requests'))) return 'Requests';
    else if(location.pathname.includes('/admin/courses')||location.pathname.includes('/hod/courses')||location.pathname.includes('/instructor/courses')||location.pathname.includes('/student/courses')) return 'Courses';
    else return 'Dashboard';
  }
  
  return (
    <header className="header">
      <h1>{getTitle()}</h1>
      <div id="header-right">
        <div style={{ position: "relative" }}>
          <button
            id="profile-btn"
            onClick={toggleDropdown}
            onBlur={closeDropdown}
          >
            P
          </button>
          {isOpen && <ProfileDropDown />}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
