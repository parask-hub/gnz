// AdminHome.js
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import AdminMainComponent from "./AdminMainComponent";
import AdminNavbar from "./AdminNavbar"; // Assuming you have an AdminNavbar component

function AdminHome() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div style={{ height: "100vh", overflowY: "hidden" }}>
      <div>
        <AdminNavbar />
      </div>
      <div className="dashboard-container">
        <AdminSidebar setActiveTab={setActiveTab} />
        <AdminMainComponent activeTab={activeTab} />
      </div>
    </div>
  );
}

export default AdminHome;
