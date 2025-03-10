import React, {useState} from "react";
import Logo from "../images/EaseLearn.png";
import { FaSearch } from "react-icons/fa";
import ProfileDropDown from "../components/ProfileDropdown";
import '../styles/NavBar.css';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    setIsOpen(false);
  };
  
  return (
    <nav>
      <div id="navbar-left">
        <img src={Logo} alt="logo" />
        <h1>EaseLearn</h1>
      </div>
      <div id="navbar-right">
        <div id="course-search">
          <input placeholder="Search" />
          <button>
            <FaSearch />
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <button
            id="profile-button"
            onClick={toggleDropdown}
            onBlur={closeDropdown}
          >
            P
          </button>
          {isOpen && <ProfileDropDown />}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
