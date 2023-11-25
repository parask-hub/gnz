import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/OneToOne.css";
import TutorProfileBox from "./TutorProfileBox";
import SortButton from "./SortButton";
import RechargeForm from "./RechargeForm";
const connectLogo = process.env.PUBLIC_URL + "/Logos/connect.png";

function OneToOne() {
  const navigate = useNavigate();

  const [selectedTutorProfile, setSelectedTutorProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [tutorProfiles, setTutorProfiles] = useState([]);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [showRechargeForm, setShowRechargeForm] = useState(false);

  const userDataStr = localStorage.getItem("userData");
  const userData = JSON.parse(userDataStr);

  const filterRef = useRef(null);
  const domain = "127.0.0.1";
  useEffect(() => {
    fetch(`http://${domain}:5000/api/tutor/tutorget`)
      .then((response) => response.json())
      .then((data) => setTutorProfiles(data))
      .catch((error) => console.error("Error fetching tutor data:", error));
  }, []);

  const handleProfileBoxClick = (tutorProfile) => {
    setSelectedTutorProfile(tutorProfile);
    const tutorProfileUPUrl = `/tutor-profile/${tutorProfile._id}`;
    window.open(tutorProfileUPUrl, "_blank");
  };

  const handleSort = (option) => {
    setSortOption(option);
    setFilterVisible(false);
  };

  const parseExperience = (experienceString) => {
    return parseFloat(experienceString.match(/\d+/)[0]);
  };

  const handleFilterToggle = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setFilterVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredProfiles = tutorProfiles
    .filter((tutorProfile) =>
      tutorProfile.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "experienceHighToLow") {
        return parseExperience(b.experience) - parseExperience(a.experience);
      } else if (sortOption === "experienceLowToHigh") {
        return parseExperience(a.experience) - parseExperience(b.experience);
      } else if (sortOption === "ordersHighToLow") {
        return b.ordersCount - a.ordersCount;
      } else if (sortOption === "ordersLowToHigh") {
        return a.ordersCount - b.ordersCount;
      } else if (sortOption === "priceHighToLow") {
        return b.rate - a.rate;
      } else if (sortOption === "priceLowToHigh") {
        return a.rate - b.rate;
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
            <p>Available Balance: {userData.coins}</p>
            <button onClick={() => setShowRechargeForm(true)}>
              Recharge Wallet
            </button>
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
          <span
            ref={filterRef}
            className={`filter-dropdown ${isFilterVisible ? "show" : ""}`}
          >
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
      {showRechargeForm && (
        <RechargeForm handleClose={() => setShowRechargeForm(false)} />
      )}
    </>
  );
}

export default OneToOne;
