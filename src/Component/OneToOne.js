import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OneToOne.css";
import TutorProfileBox from "./TutorProfileBox";

import tutorProfiles from "./TutorData";

function OneToOne() {
  const navigate = useNavigate();

  const [selectedTutorProfile, setSelectedTutorProfile] = useState(null);

  const handleProfileBoxClick = (tutorProfile) => {
    setSelectedTutorProfile(tutorProfile);
    // You can navigate to the TutorProfileUP page when a profile is clicked
    const tutorProfileUPUrl = `/tutor-profile/${tutorProfile.id}`;
    window.open(tutorProfileUPUrl, "_blank");
  };

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
          {/* Map through tutor profiles and render TutorProfileBox components */}
          {tutorProfiles.map((tutorProfile) => (
            <div
              key={tutorProfile.id}
              onClick={() => handleProfileBoxClick(tutorProfile)}
              style={{ cursor: "pointer" }}
            >
              <TutorProfileBox tutorProfile={tutorProfile} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OneToOne;
