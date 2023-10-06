import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import "./ProfilePopUp.css";

const ProfilePopUp = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Add event listener to close the popup when clicking outside of it
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest(".ProfilePopup")) {
        setIsOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handlePopupToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log(`Clicked on ${item}`);

    if (item === "Edit Profile") {
      setIsSettingsOpen(true);
    } else {
      setIsSettingsOpen(false);
    }
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    // handle logout logic
  };

  return (
    <div className="ProfilePopup" onClick={handlePopupToggle}>
      <div className="right-profile">
        <img
          className="profile-icon"
          src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
          alt="Profile"
        />
        <div style={{ marginLeft: "5px" }}>
          {isLoggedIn ? <h4>Profile</h4> : <h4>Login</h4>}
        </div>
      </div>
      {isOpen && (
        <div className="popup-container">
          <ul className="popup-menu">
            <li
              className="popup-item"
              onClick={() => handleItemClick("Edit Profile")}
            >
              <span className="popup-item-text">Edit Profile</span>
            </li>
            <li
              className="popup-item"
              onClick={() => handleItemClick("Bookmarks")}
            >
              <span className="popup-item-text">Bookmarks</span>
            </li>
            <li
              className="popup-item"
              onClick={() => handleItemClick("Reports")}
            >
              <span className="popup-item-text">Reports</span>
            </li>
            <li className="popup-item" onClick={handleLogout}>
              <span className="popup-item-text">Logout</span>
            </li>
          </ul>
        </div>
      )}
      {isSettingsOpen && <SettingsPage handleClose={handleCloseSettings} />}
    </div>
  );
};

export default ProfilePopUp;
