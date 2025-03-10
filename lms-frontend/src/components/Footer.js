import React from 'react'
import Logo from "../images/EaseLearn.png";
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
        <img src={Logo} alt="logo" />
        <div id="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>- Home</li>
            <li>- About us</li>
          </ul>
        </div>
        <div id="contact">
          <h3>Contact</h3>
          <ul>
            <li>
              <span>Phone: </span>9876543210
            </li>
            <li>
              <span>Email: </span>example@gmail.com
            </li>
          </ul>
        </div>
      </footer>
  )
}

export default Footer