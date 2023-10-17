// AdminMainContent.js
import React from "react";
// import "./AdminMainContent.css"; // Add your CSS file for styling
import "./AdminMainComponent.css";
import Home from "./Home";
import Tutor from "./Tutor";

const AdminMainComponent = ({ activeTab }) => {
  return (
    <div className="admin-main-content">
      {activeTab === "Home" && (
        <div>
          <Home />
        </div>
      )}
      {activeTab === "Tutors" && (
        <div>
          <Tutor />
        </div>
      )}
      {activeTab === "Users" && <div>Users Component</div>}
      {/* Add more components based on tabs */}
    </div>
  );
};

export default AdminMainComponent;
