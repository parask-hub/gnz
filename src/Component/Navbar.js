// final code
import React from "react";
import "./Navbar.css";
import ProfilePopup from "./ProfilePopUp";

export default function Navbar(props, status) {
  return (
    <div className="Navbar">
      <p className="logo">
        <img
          src="https://png.pngtree.com/element_our/sm/20180518/sm_5afec7f1592f4.jpg"
          width="30px"
          alt="logo"
        />{" "}
        <h2>GenZ</h2>
      </p>

      <div className="right">
        <ProfilePopup />
      </div>
    </div>
  );
}
