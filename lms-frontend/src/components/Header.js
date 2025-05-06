import React, {useState} from "react";
import ProfileDropDown from "./ProfileDropdown";
import '../styles/Header.css';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    setIsOpen(false);
  };

  const name="Dashboard"
  
  return (
    <header className="header">
      <h1>{name}</h1>
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
