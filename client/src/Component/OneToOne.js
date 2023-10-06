import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OneToOne.css";
import TutorProfileBox from "./TutorProfileBox";
import SortButton from "./SortButton";
import tutorProfiles from "./TutorData";
const connectLogo = process.env.PUBLIC_URL + "/Logos/connect.png";

function OneToOne() {
  const navigate = useNavigate();

  const [selectedTutorProfile, setSelectedTutorProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(null);

  const handleProfileBoxClick = (tutorProfile) => {
    setSelectedTutorProfile(tutorProfile);
    const tutorProfileUPUrl = `/tutor-profile/${tutorProfile.id}`;
    window.open(tutorProfileUPUrl, "_blank");
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const filteredProfiles = tutorProfiles
    .filter((tutorProfile) =>
      tutorProfile.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "experienceHighToLow") {
        return b.experience - a.experience;
      } else if (sortOption === "experienceLowToHigh") {
        return a.experience - b.experience;
      } else if (sortOption === "ordersHighToLow") {
        return b.orders - a.orders;
      } else if (sortOption === "ordersLowToHigh") {
        return a.orders - b.orders;
      } else if (sortOption === "priceHighToLow") {
        return b.hourlyRate - a.hourlyRate;
      } else if (sortOption === "priceLowToHigh") {
        return a.hourlyRate - b.hourlyRate;
      } else if (sortOption === "ratingHighToLow") {
        return b.rating - a.rating;
      } else if (sortOption === "ratingLowToHigh") {
        return a.rating - b.rating;
      } else {
        return 0;
      }
    });

  return (
    <>
      <div style={{ minHeight: "86vh" }}>
        <div className="row1">
          <div className="row1content">
            <img width="30" height="30" src={connectLogo} alt="video-message" />
            <h3 style={{ marginLeft: "10px" }}>1:1 Connect</h3>
          </div>
          <div className="row2content">
            <p>Available Balance: Rs 200</p>
            <button>Recharge Wallet</button>
          </div>
        </div>

        <div className="searchbar">
          <span className="search-input">
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
          </span>
          <span>
            {/* Pass the handleSort function to SortButton */}
            <SortButton onSort={handleSort} />
          </span>
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
