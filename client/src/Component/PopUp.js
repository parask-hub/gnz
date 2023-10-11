import React from "react";
import "./styles/PopUp.css"; // Import the CSS file for styling

const Popup = ({ message, type }) => {
  const getPopupClass = () => {
    switch (type) {
      case "success":
        return "success-popup";
      case "error":
        return "error-popup";
      default:
        return "";
    }
  };

  return (
    <div className={`popup ${getPopupClass()}`}>
      <p>{message}</p>
    </div>
  );
};

export default Popup;
