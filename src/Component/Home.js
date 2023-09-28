import React, { useEffect, useState } from "react";
import "./Home.css";

import Sidebar from "./Sidebar";
import ProfilePopup from "./ProfilePopUp";
import Navbar from "./Navbar";
import SettingsPopup from "./SettingsPopup";
import Select from "react-select";
import Landing from "./Landing";
import makeAnimated from "react-select/animated";
import Footer from "./Footer";
import OneToOne from "./OneToOne";
import UserProfile from "./UserProfile";
import TutorProfileUP from "./TutorProfileUP";

const animatedComponents = makeAnimated();

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleItemClick = () => {
    setIsSettingsOpen(false);
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
          handleItemClick={handleItemClick}
          handleItemClickSetting={handleItemClickSetting}
        />
        <div className="maincontent">
          <div className="pg">
            <Landing />
            <OneToOne />
            <UserProfile />
            <TutorProfileUP />
            <Footer />
          </div>
        </div>
      </div>
      {isSettingsOpen && <SettingsPopup handleClose={handleClose} />}
    </>
  );
}
