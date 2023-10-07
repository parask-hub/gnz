import React, { useState } from "react";

import "./styles/SettingPage.css";

const BlurBackground = () => {
  return <div className="blur-background"></div>;
};

const LoginForm = ({ handleCloseForm }) => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://example.com/profile-photo.jpg"
  ); // Initial profile photo URL

  const handleAvatarChange = () => {
    setProfilePhoto("https://example.com/new-profile-photo.jpg");
  };

  return (
    <>
      <BlurBackground />
      <div className="SettingsPage">
        <button className="close-button" onClick={handleCloseForm}>
          ✕
        </button>
        <h1>Login Form</h1>
        <div>
          <div className="numberfields">
            Enter Your Number :
            <span>
              <span className="countrycode">+91</span>{" "}
              <input type="text" placeholder="99**********" />
            </span>
          </div>

          <button className="button">Get OTP</button>
        </div>
        <div>
          <div className="numberfields">
            Enter OTP :
            <span>
              <input type="text" placeholder="Enter 6 digit OTP" />
            </span>
          </div>

          <button className="button">Verify OTP</button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
