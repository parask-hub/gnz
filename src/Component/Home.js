import React, { useState } from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SettingsPopup from "./SettingsPopup";
import Footer from "./Footer";
import UserProfile from "./UserProfile";
import OneToOne from "./OneToOne";
import TutorProfileUP from "./TutorProfileUP";
import Landing from "./Landing";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedTab, setSelectedTab] = useState(
    isLoggedIn ? "UserProfile" : "QuickLogin"
  );

  const handleItemClick = (tab) => {
    setIsSettingsOpen(false);
    setSelectedTab(tab);
  };

  const handleItemClickSetting = () => {
    setIsSettingsOpen(true);
  };

  const handleClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="the-total-page">
        <Sidebar
          isLoggedIn={isLoggedIn}
          selectedTab={selectedTab}
          handleItemClick={handleItemClick}
          handleItemClickSetting={handleItemClickSetting}
        />
        <div className="maincontent">
          <div className="pg">
            {isLoggedIn ? (
              <>
                {selectedTab === "UserProfile" && <UserProfile />}
                {selectedTab === "OneToOne" && <OneToOne />}
                {selectedTab === "TutorProfileUP" && <TutorProfileUP />}
                {/* Add other logged-in components as needed */}
              </>
            ) : (
              <>
                {selectedTab === "QuickLogin" && <Landing />}
                {/* Add non-logged-in components as needed */}
              </>
            )}
            <Footer />
          </div>
        </div>
      </div>
      {isSettingsOpen && <SettingsPopup handleClose={handleClose} />}
    </>
  );
}
