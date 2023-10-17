import React, { useState } from "react";
// import SettingsPage from "./LoginForm";
import ProfileEditForm from "./ProfileEditForm";

function SmallMenuPopUp({
  isOpen,
  handleLogout,
  handleCloseSettings,
  isSettingsOpen,
  toggleUserState,
  setLoggedUser,
  data,
}) {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  const openEditProfile = () => {
    setEditProfileOpen(true);
  };

  const closeEditProfile = () => {
    setEditProfileOpen(false);
  };
  return (
    <>
      {isOpen && (
        <div className="popup-container">
          <ul className="popup-menu">
            <li className="popup-item" onClick={openEditProfile}>
              <span className="popup-item-text">Edit Profile</span>
            </li>
            <li className="popup-item">
              <span className="popup-item-text">Bookmarks</span>
            </li>
            <li className="popup-item">
              <span className="popup-item-text">Reports</span>
            </li>
            <li className="popup-item" onClick={toggleUserState}>
              <span className="popup-item-text">Logout</span>
            </li>
          </ul>
        </div>
      )}
      {/* {isSettingsOpen && <SettingsPage handleClose={handleCloseSettings} />} */}
      {isEditProfileOpen && (
        <ProfileEditForm
          handleClose={closeEditProfile}
          data={data}
          setLoggedUser={setLoggedUser}
        />
      )}
    </>
  );
}

export default SmallMenuPopUp;
