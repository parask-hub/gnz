import React from "react";
import "../App.css";
import "./Sidebar.css";

const Sidebar = ({
  isLoggedIn,
  selectedTab,
  handleItemClick,
  handleSettingsClick,
  handleItemClickSetting,
}) => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {isLoggedIn ? (
          <>
            <li
              key="Profile"
              className={`row ${selectedTab === "UserProfile" ? "active" : ""}`}
              onClick={() => handleItemClick("UserProfile")}
            >
              <span className="sidebar-text">Profile</span>
            </li>
            <li
              key="OneToOne"
              className={`row ${selectedTab === "OneToOne" ? "active" : ""}`}
              onClick={() => handleItemClick("OneToOne")}
            >
              <span className="sidebar-text">1:1 Connect</span>
            </li>
            <li
              key="SupportLoggedIn"
              className={`row ${selectedTab === "Support" ? "active" : ""}`}
              onClick={() => handleItemClick("Support")}
            >
              <span className="sidebar-text">Support</span>
            </li>
            <li
              key="InboxLoggedIn"
              className={`row ${selectedTab === "Inbox" ? "active" : ""}`}
              onClick={() => handleItemClick("Inbox")}
            >
              <span className="sidebar-text">Inbox</span>
            </li>
          </>
        ) : (
          <>
            <li
              key="QuickLogin"
              className={`row ${selectedTab === "QuickLogin" ? "" : ""}`}
              onClick={() => handleItemClick("QuickLogin")}
            >
              <img src="" alt="" />
              <span className="sidebar-text">Quick Login</span>
            </li>
            <li
              key="TTT"
              className={`row ${selectedTab === "TTT" ? "active" : ""}`}
              onClick={() => handleItemClick("TTT")}
            >
              <span className="sidebar-text">Talk To Tutor</span>
            </li>
            <li
              key="SupportNotLoggedIn"
              className={`row ${selectedTab === "Support" ? "active" : ""}`}
              onClick={() => handleItemClick("Support")}
            >
              <span className="sidebar-text">Support / Help</span>
            </li>
            <li
              key="InboxNotLoggedIn"
              className={`row ${selectedTab === "Inbox" ? "active" : ""}`}
              onClick={() => handleItemClick("Inbox")}
            >
              <span className="sidebar-text">Inbox</span>
            </li>
          </>
        )}
      </ul>
      <ul className="SidebarList" style={{ display: "none" }}>
        {isLoggedIn && (
          <li
            key="Settings"
            className={`row ${selectedTab === "Settings" ? "active" : ""}`}
            onClick={() => handleItemClickSetting("Settings")}
          >
            <span className="sidebar-text">Settings</span>
            <li onClick={handleSettingsClick}></li>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
