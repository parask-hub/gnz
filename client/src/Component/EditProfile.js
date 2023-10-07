import React, { useState } from "react";

import "./styles/SettingPage.css";

const BlurBackground = () => {
  return <div className="blur-background"></div>;
};

const LoginForm = ({ handleClose }) => {
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
        <button className="close-button" onClick={handleClose}>
          ✕
        </button>
        <h1>Edit Profile</h1>
        <p>Change Profile Picture</p>

        <button className="button">Save Change</button>
      </div>
    </>
  );
};

export default LoginForm;
