import React from "react";
import SettingsPage from "./LoginForm";

function SmallMenuPopUp({
  isOpen,
  handleLogout,
  handleCloseSettings,
  isSettingsOpen,
}) {
  return (
    <>
      {isOpen && (
        <div className="popup-container">
          <ul className="popup-menu">
            <li className="popup-item">
              <span className="popup-item-text">Edit Profile</span>
            </li>
            <li className="popup-item">
              <span className="popup-item-text">Bookmarks</span>
            </li>
            <li className="popup-item">
              <span className="popup-item-text">Reports</span>
            </li>
            <li className="popup-item" onClick={handleLogout}>
              <span className="popup-item-text">Logout</span>
            </li>
          </ul>
        </div>
      )}
      {isSettingsOpen && <SettingsPage handleClose={handleCloseSettings} />}
    </>
  );
}

export default SmallMenuPopUp;
