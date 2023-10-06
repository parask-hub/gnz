import React, { useState } from "react";

import "./SettingPage.css";

const SettingsPage = ({ handleClose }) => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://example.com/profile-photo.jpg"
  ); // Initial profile photo URL

  const handleAvatarChange = () => {
    setProfilePhoto("https://example.com/new-profile-photo.jpg");
  };

  return (
    <div className="SettingsPage">
      <button className="close-button" onClick={handleClose}>
        ✕
      </button>
      <h1>Edit Profile</h1>
      <p>Change Profile Picture</p>

      <button className="button">Save Change</button>
    </div>
  );
};

export default SettingsPage;
