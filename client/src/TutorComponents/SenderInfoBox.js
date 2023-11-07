import React from "react";
import "./SenderInfoBox.css"; // Import your CSS file

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile-card">
      <img
        className="user-profile-image"
        src={user.profilePicture}
        alt="Profile"
      />
      <div className="user-profile-name">
        {user.firstname} {user.lastname}
      </div>
      <div className="user-profile-details">
        <div>
          <span className="user-profile-detail-label">Mobile Number:</span>
          <span className="user-profile-detail-value">{user.mobileNumber}</span>
        </div>
        <div>
          <span className="user-profile-detail-label">Interest:</span>
          <span className="user-profile-detail-value">{user.interest}</span>
        </div>
        <div>
          <span className="user-profile-detail-label">Gender:</span>
          <span className="user-profile-detail-value">{user.gender}</span>
        </div>
        <div>
          <span className="user-profile-detail-label">About Me:</span>
          <span className="user-profile-detail-value">{user.aboutMe}</span>
        </div>
        <div>
          <span className="user-profile-detail-label">Coins:</span>
          <span className="user-profile-detail-value">{user.coins}</span>
        </div>
        <div>
          <span className="user-profile-detail-label">English Fluency:</span>
          <span className="user-profile-detail-value">
            {user.englishFluency}
          </span>
        </div>
        <div>
          <span className="user-profile-detail-label">Achievements:</span>
          <span className="user-profile-detail-value">{user.achievements}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
