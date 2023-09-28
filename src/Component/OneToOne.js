import React from "react";
import "./OneToOne.css";
import TutorProfileBox from "./TutorProfileBox";

// Import the search icon URL

function OneToOne() {
  return (
    <>
      <div>
        <div className="row1">
          <div className="row1content">
            <h2>1:1 Connect</h2>
          </div>
          <div className="row2content">
            <p>Available Balance: Rs 200</p>
            <button>Recharge Wallet</button>
          </div>
        </div>
        <hr />
        <div className="searchbar">
          <div className="search-input">
            <input type="text" placeholder="Search..." />
            <img
              src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
              alt="Search"
              className="search-icon"
            />
          </div>
        </div>
        <div className="profilecontainer">
          <TutorProfileBox />
          <TutorProfileBox />
          <TutorProfileBox />
          <TutorProfileBox />
          <TutorProfileBox />
          <TutorProfileBox />
          <TutorProfileBox />
          <TutorProfileBox />
          <TutorProfileBox />
        </div>
      </div>
    </>
  );
}

export default OneToOne;
