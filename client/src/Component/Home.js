import React, { useState } from "react";
import "./styles/Home.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import Footer from "./Footer";
import UserProfile from "./UserProfile";
import OneToOne from "./OneToOne";
import TutorProfileUP from "./TutorProfileUP";
import Landing from "./Landing";
import Support from "./Support";

export default function Home({
  isLoggedIn,
  toggleUserState,
  setLoggedUser,
  data,
}) {
  console.log("in Home : " + isLoggedIn);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
      {data ? (
        <Navbar
          isLoggedIn={isLoggedIn}
          handleItemClickSetting={handleItemClickSetting}
          handleClose={handleClose}
          toggleUserState={toggleUserState}
          setLoggedUser={setLoggedUser}
          data={data}
        />
      ) : (
        <>
          <img
            src="https://i.gifer.com/ZKZx.gif"
            height={"20px"}
            style={{ marginRight: "5px" }}
          />
        </>
      )}

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
                {selectedTab === "UserProfile" &&
                  (data ? (
                    <UserProfile data={data} />
                  ) : (
                    <div>
                      <img
                        src="https://i.gifer.com/ZKZx.gif"
                        height={"20px"}
                        style={{ marginRight: "5px" }}
                      />
                    </div>
                  ))}
                {selectedTab === "OneToOne" && <OneToOne />}
                {selectedTab === "TutorProfileUP" && <TutorProfileUP />}
                {selectedTab === "Support" && <Support />}
                {selectedTab === "Inbox" && <Support />}
              </>
            ) : (
              <>
                {selectedTab === "QuickLogin" && <Landing />}
                {selectedTab === "Support" && <Support />}
                {selectedTab === "Inbox" && <Support />}
                {selectedTab === "TTT" && <Support />}

                {/* Add non-logged-in components as needed */}
              </>
            )}
            <Footer />
          </div>
        </div>
      </div>
      {/* {isSettingsOpen && <SettingsPopup handleClose={handleClose} />} */}
    </>
  );
}
