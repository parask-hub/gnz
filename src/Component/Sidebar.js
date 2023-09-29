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
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/contract-job.png"
                alt="contract-job"
              />
              <span className="sidebar-text">Profile</span>
            </li>
            <li
              key="OneToOne"
              className={`row ${selectedTab === "OneToOne" ? "active" : ""}`}
              onClick={() => handleItemClick("OneToOne")}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/video-message.png"
                alt="video-message"
              />
              <span className="sidebar-text">1:1 Connect</span>
            </li>
            <li
              key="SupportLoggedIn"
              className={`row ${selectedTab === "Support" ? "active" : ""}`}
              onClick={() => handleItemClick("Support")}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/customer-support.png"
                alt="customer-support"
              />
              <span className="sidebar-text">Support</span>
            </li>
            <li
              key="InboxLoggedIn"
              className={`row ${selectedTab === "Inbox" ? "active" : ""}`}
              onClick={() => handleItemClick("Inbox")}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/download-mail.png"
                alt="download-mail"
              />
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
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/sf-black-filled/64/login-rounded-right.png"
                alt="login-rounded-right"
              />
              <span className="sidebar-text">Quick Login</span>
            </li>
            <li
              key="TTT"
              className={`row ${selectedTab === "TTT" ? "active" : ""}`}
              onClick={() => handleItemClick("TTT")}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/external-ddara-lineal-ddara/64/external-orator-presentation-speaker-speechmaker-talker-christmas-ddara-lineal-ddara.png"
                alt="external-orator-presentation-speaker-speechmaker-talker-christmas-ddara-lineal-ddara"
              />
              <span className="sidebar-text">Talk To Tutor</span>
            </li>
            <li
              key="SupportNotLoggedIn"
              className={`row ${selectedTab === "Support" ? "active" : ""}`}
              onClick={() => handleItemClick("Support")}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/customer-support.png"
                alt="customer-support"
              />
              <span className="sidebar-text">Support / Help</span>
            </li>
            <li
              key="InboxNotLoggedIn"
              className={`row ${selectedTab === "Inbox" ? "active" : ""}`}
              onClick={() => handleItemClick("Inbox")}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/download-mail.png"
                alt="download-mail"
              />
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
