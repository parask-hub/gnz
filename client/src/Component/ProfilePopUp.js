import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import "./styles/ProfilePopUp.css";
import SmallMenuPopUp from "./SmallMenuPopUp";

const ProfilePopUp = ({
  isLoggedIn,
  handleClose,
  toggleUserState,
  setLoggedUser,
  data,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginFormVisible, setLoginFormVisibility] = useState(false);

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
    // If the user is not logged in and the popup is opened, show the login form
    if (!isLoggedIn && !isOpen) {
      setLoginFormVisibility(true);
    }
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    toggleUserState();
  };

  const handleCloseForm = () => {
    setLoginFormVisibility(false);
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
          {isLoggedIn ? (
            <div>
              <h4>Profile</h4>
              <SmallMenuPopUp
                isOpen={isOpen}
                handleCloseSettings={handleCloseSettings}
                handleLogout={handleLogout}
                isSettingsOpen={isSettingsOpen}
                toggleUserState={toggleUserState}
                setLoggedUser={setLoggedUser}
                data={data}
              />
            </div>
          ) : (
            <div>
              <h3>Login</h3>
              <div>
                {isLoginFormVisible && (
                  <LoginForm
                    handleCloseForm={handleCloseForm}
                    toggleUserState={toggleUserState}
                    setLoggedUser={setLoggedUser}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;
