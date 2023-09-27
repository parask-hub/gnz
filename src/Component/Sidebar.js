import React from "react";
import "../App.css";
import "./Sidebar.css";

const Sidebar = ({
  currentPathname,
  handleItemClick,
  handleSettingsClick,
  handleItemClickSetting,
}) => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <li
          key="Home"
          id={currentPathname === "/login" ? "active" : ""}
          onClick={() => handleItemClick("/Login")}
          className="row"
        >
          <img src="" alt="" />
          <span className="sidebar-text">Quick Login</span>
        </li>
        <li
          key="Trending"
          id={currentPathname === "/TTT" ? "active" : ""}
          onClick={() => handleItemClick("/TTT")}
          className="row"
        >
          <span className="sidebar-text">Talk To Tutor</span>
        </li>
        <li
          key="MostLiked"
          id={currentPathname === "/Support" ? "active" : ""}
          onClick={() => handleItemClick("/Support")}
          className="row"
        >
          <span className="sidebar-text">Support / Help</span>
        </li>
        <li
          key="Latest"
          id={currentPathname === "/Inbox" ? "active" : ""}
          onClick={() => handleItemClick("Inbox")}
          className="row"
        >
          <span className="sidebar-text">Inbox</span>
        </li>
      </ul>
      <ul className="SidebarList" style={{ display: "none" }}>
        <li
          key="Settings"
          id={currentPathname === "/Settings" ? "active" : ""}
          onClick={() => handleItemClickSetting("/Settings")}
          className="row"
        >
          <span className="sidebar-text">Settings</span>
          <li onClick={handleSettingsClick}></li>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
