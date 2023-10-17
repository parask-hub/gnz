// Navbar.js

import React from "react";
import "./styles/Navbar.css";
import ProfilePopup from "./ProfilePopUp";

export default function Navbar({
  isLoggedIn,
  handleSettingsClick,
  handleClose,
  toggleUserState,
  setLoggedUser,
  data,
}) {
  return (
    <div className="Navbar">
      <div
        className="navcontainer"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div>
          <p className="logo">
            <img
              src="https://png.pngtree.com/element_our/sm/20180518/sm_5afec7f1592f4.jpg"
              width="30px"
              alt="logo"
            />{" "}
            <h1>GenZ</h1>
          </p>
        </div>

        <div className="text">
          <span style={{ fontSize: "20px" }}>
            {isLoggedIn ? (
              <h2>
                {data.firstname} {data.lastname}
              </h2>
            ) : (
              <h2>Welcome To GenZ</h2>
            )}
          </span>
          <span style={{ fontSize: "15px", color: "grey" }}>
            {isLoggedIn ? (
              <p>Welcome to your profile</p>
            ) : (
              <p>Find your Verified English practice tutor here</p>
            )}
          </span>
        </div>
      </div>
      <div className="right">
        <ProfilePopup
          isLoggedIn={isLoggedIn}
          handleSettingsClick={handleSettingsClick}
          handleClose={handleClose}
          toggleUserState={toggleUserState}
          setLoggedUser={setLoggedUser}
          data={data}
        />
      </div>
    </div>
  );
}
