// Navbar.js

import React from "react";
import "./Navbar.css";
import ProfilePopup from "./ProfilePopUp";

export default function Navbar({ isLoggedIn }) {
  return (
    <div className="Navbar">
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
          {isLoggedIn ? <h2>Abhinav Garg</h2> : <h2>Welcome To GenZ</h2>}
        </span>
        <span style={{ fontSize: "15px", color: "grey" }}>
          {isLoggedIn ? (
            <p>Welcome to your profile</p>
          ) : (
            <p>Find your Verified English practice tutor here</p>
          )}
        </span>
      </div>

      <div className="right">
        <ProfilePopup isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}
