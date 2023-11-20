// AdminSidebar.js
import React, { useState } from "react";
import "./AdminSidebar.css"; // Add your CSS file for styling

const AdminSidebar = ({ setActiveTab }) => {
  const [activeTab, setActiveTabLocal] = useState("Home");

  const handleClick = (tab) => {
    setActiveTabLocal(tab);
    setActiveTab(tab);
  };

  return (
    <div className="admin-sidebar">
      <ul>
        <li
          onClick={() => handleClick("Home")}
          className={activeTab === "Home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => handleClick("Tutors")}
          className={activeTab === "Tutors" ? "active" : ""}
        >
          Tutors
        </li>
        <li
          onClick={() => handleClick("Sessions")}
          className={activeTab === "Sessions" ? "active" : ""}
        >
          Sessions
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
