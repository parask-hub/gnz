import React from "react";
import "./styles/TutorProfileBox.css";

function TutorProfileBox({ tutorProfile }) {
  const { name, image, orders, description, hourlyRate } = tutorProfile;

  return (
    <div className="profileBox">
      <div className="leftportion">
        <div>
          <img
            src={image}
            alt=""
            style={{
              height: "80px",
              width: "80px",
              background: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <div style={{ fontSize: "12px" }}>
          <p>Orders: {orders}</p>
        </div>
      </div>
      <div className="rightportion">
        <h3>{name}</h3>
        <span style={{ fontSize: "13px" }}>{description}</span>
        <div className="rightbottom">
          <div>
            <b>{`Rs ${hourlyRate}/Hr`}</b>
          </div>
          <div>
            <p>
              <b>Chat Now</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfileBox;
