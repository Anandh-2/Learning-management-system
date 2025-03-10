import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
import image from "../images/Elearning_platform.jpg";
import Rating from "../components/Rating";
import Logo from "../images/EaseLearn.png";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome">
      <nav>
        <div id="title">
          <img src={Logo} alt="logo" />
          <h1>EaseLearn</h1>
        </div>
        <div id="auth-buttons">
          <button id="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button id="register-button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </nav>
      <div id="welcome-content">
        <div id="welcome-text">
          <p>
            Lets <span>change</span>{" "}
          </p>
          <p>
            how it's <span>taught</span>
          </p>
        </div>
        <div id="welcome-img">
          <img src={image} alt="Welcome" />
        </div>
      </div>
      <div id="about">
        <h2>About</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div id="rating">
        <h2>Ratings</h2>
        <div id="rating-section">
          <Rating />
          <Rating />
          <Rating />
          <Rating />
        </div>
      </div>
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
    </div>
  );
}

export default Welcome;
