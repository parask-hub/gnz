import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OneToOne.css";
import TutorProfileBox from "./TutorProfileBox";

import tutorProfiles from "./TutorData";
const connectLogo = process.env.PUBLIC_URL + "/Logos/connect.png";
function OneToOne() {
  const navigate = useNavigate();

  const [selectedTutorProfile, setSelectedTutorProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleProfileBoxClick = (tutorProfile) => {
    setSelectedTutorProfile(tutorProfile);
    const tutorProfileUPUrl = `/tutor-profile/${tutorProfile.id}`;
    window.open(tutorProfileUPUrl, "_blank");
  };

  const filteredProfiles = tutorProfiles.filter((tutorProfile) =>
    tutorProfile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ minHeight: "86vh" }}>
        <div className="row1">
          <div className="row1content">
            <img
              width="30"
              height="30"
              // src="https://img.icons8.com/ios-filled/50/video-message.png"
              src={connectLogo}
              alt="video-message"
            />
            <h3 style={{ marginLeft: "10px" }}>1:1 Connect</h3>
          </div>
          <div className="row2content">
            <p>Available Balance: Rs 200</p>
            <button>Recharge Wallet</button>
          </div>
        </div>

        <div className="searchbar">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
              alt="Search"
              className="search-icon"
            />
          </div>
        </div>
        <div className="profilecontainer">
          {filteredProfiles.length === 0 ? (
            <p style={{ color: "red", fontSize: "20px", padding: "30px" }}>
              <b>No results found.</b>
            </p>
          ) : (
            filteredProfiles.map((tutorProfile) => (
              <div
                key={tutorProfile.id}
                onClick={() => handleProfileBoxClick(tutorProfile)}
                style={{ cursor: "pointer" }}
              >
                <TutorProfileBox tutorProfile={tutorProfile} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default OneToOne;
