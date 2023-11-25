import React from "react";
import "./styles/TutorProfileBox.css";

function TutorProfileBox({ tutorProfile }) {
  const { name, image, ordersCount, description, rate } = tutorProfile;
  const domain = "127.0.0.1";

  return (
    <div className="profileBox">
      <div className="leftportion">
        <div>
          {/* <img
            src={image}
            alt=""
            style={{
              height: "80px",
              width: "80px",
              background: "cover",
              borderRadius: "50%",
            }}
          /> */}
          {image != "" ? ( // Check if profilePicture exists
            <img
              src={`http://${domain}:5000/${image}`} // Use the actual profile picture
              className="avatar img-circle img-thumbnail"
              alt="avatar"
              style={{
                height: "80px",
                width: "80px",
                background: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png" // Use the default image
              className="avatar img-circle img-thumbnail"
              alt="avatar"
              style={{
                height: "80px",
                width: "80px",
                background: "cover",
                borderRadius: "50%",
              }}
            />
          )}
        </div>
        <div style={{ fontSize: "12px" }}>
          <p>Orders: {ordersCount}</p>
        </div>
      </div>
      <div className="rightportion">
        <h3>{name}</h3>
        <span style={{ fontSize: "13px" }}>{description}</span>
        <div className="rightbottom">
          <div>
            <b>{`Rs ${rate}/Hr`}</b>
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
