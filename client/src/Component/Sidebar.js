import React, { useState } from "react";
import "../App.css";
import "./Sidebar.css";

const profileLogo = process.env.PUBLIC_URL + "/Logos/profile.png";
const connectLogo = process.env.PUBLIC_URL + "/Logos/connect.png";
const supportLogo = process.env.PUBLIC_URL + "/Logos/support.png";

const Sidebar = ({
  isLoggedIn,
  selectedTab,
  handleItemClick,
  handleSettingsClick,
  handleItemClickSetting,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleItemClickAndClose = (tab) => {
    handleItemClick(tab);
    closeSidebar();
  };
  return (
    <div className={`Sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="Overlay" onClick={closeSidebar}></div>
      <div className="ToggleBtn" onClick={toggleSidebar}>
        <div className="HamburgerLine"></div>
        <div className="HamburgerLine"></div>
        <div className="HamburgerLine"></div>
      </div>
      <ul className="SidebarList">
        {isLoggedIn ? (
          <>
            <li
              key="Profile"
              className={`row ${selectedTab === "UserProfile" ? "active" : ""}`}
              onClick={() => {
                handleItemClick("UserProfile");
                toggleSidebar();
              }}
            >
              <img
                width="25"
                height="30"
                // src="https://img.icons8.com/ios-filled/50/contract-job.png"
                src={profileLogo}
                alt="profile"
              />
              <span className="sidebar-text">Profile</span>
            </li>
            <li
              key="OneToOne"
              className={`row ${selectedTab === "OneToOne" ? "active" : ""}`}
              onClick={() => {
                handleItemClick("OneToOne");
                toggleSidebar();
              }}
            >
              <img
                width="30"
                height="30"
                // src="https://img.icons8.com/ios-filled/50/video-message.png"
                src={connectLogo}
                alt="video-message"
              />
              <span className="sidebar-text">1:1 Connect</span>
            </li>
            <li
              key="SupportLoggedIn"
              className={`row ${selectedTab === "Support" ? "active" : ""}`}
              onClick={() => {
                handleItemClick("Support");
                toggleSidebar();
              }}
            >
              <img
                width="30"
                height="30"
                // src="https://img.icons8.com/ios-filled/50/customer-support.png"
                src={supportLogo}
                alt="customer-support"
              />
              <span className="sidebar-text">Support</span>
            </li>
            <li
              key="InboxLoggedIn"
              className={`row ${selectedTab === "Inbox" ? "active" : ""}`}
              onClick={() => {
                handleItemClick("Inbox");
                toggleSidebar();
              }}
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
              onClick={() => {
                handleItemClick("QuickLogin");
                toggleSidebar();
              }}
            >
              <img
                width="30"
                height="30"
                // src="https://img.icons8.com/sf-black-filled/64/login-rounded-right.png"
                src={profileLogo}
                alt="login-rounded-right"
              />
              <span className="sidebar-text">Quick Login</span>
            </li>
            <li
              key="TTT"
              className={`row ${selectedTab === "TTT" ? "active" : ""}`}
              onClick={() => {
                handleItemClick("TTT");
                toggleSidebar();
              }}
            >
              <img
                width="30"
                height="30"
                // src="https://img.icons8.com/external-ddara-lineal-ddara/64/external-orator-presentation-speaker-speechmaker-talker-christmas-ddara-lineal-ddara.png"
                src={connectLogo}
                alt="external-orator-presentation-speaker-speechmaker-talker-christmas-ddara-lineal-ddara"
              />
              <span className="sidebar-text">Talk To Tutor</span>
            </li>
            <li
              key="SupportNotLoggedIn"
              className={`row ${selectedTab === "Support" ? "active" : ""}`}
              onClick={() => {
                handleItemClick("Support");
                toggleSidebar();
              }}
            >
              <img
                width="30"
                height="30"
                // src="https://img.icons8.com/ios-filled/50/customer-support.png"
                src={supportLogo}
                alt="customer-support"
              />
              <span className="sidebar-text">Support</span>
            </li>
            <li
              key="InboxNotLoggedIn"
              className={`row ${selectedTab === "Inbox" ? "active" : ""}`}
              onClick={() => {
                handleItemClick("Inbox");
                toggleSidebar();
              }}
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
