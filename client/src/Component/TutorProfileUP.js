import React from "react";
import { useParams } from "react-router-dom";
import "./styles/TutorProfileUP.css";

import tutorProfiles from "./TutorData";

function TutorProfileUP() {
  const { tutorId } = useParams();
  const tutorProfile = tutorProfiles.find(
    (profile) => profile.id === parseInt(tutorId)
  );

  const handleCopyLink = () => {
    const tutorProfileLink = `${window.location.origin}/tutor-profile/${tutorProfile.id}`;
    navigator.clipboard
      .writeText(tutorProfileLink)
      .then(() => alert("Link copied to clipboard"))
      .catch((error) => console.error("Unable to copy to clipboard", error));
  };

  if (!tutorProfile) {
    return <div>Tutor not found</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll !important",
        padding: "10px",
      }}
    >
      <div
        style={{
          padding: "10px",

          background: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p className="log">
          <img
            src="https://png.pngtree.com/element_our/sm/20180518/sm_5afec7f1592f4.jpg"
            width="40px"
            alt="logo"
          />{" "}
          <span>
            <h1>GenZ</h1>
          </span>
          <span style={{ marginLeft: "20px", fontSize: "18px" }}>
            <p>Tutor Profile</p>
          </span>
        </p>
      </div>

      <div
        className="con"
        style={{
          background: "#dad9d9",
          width: "100vw",
          margin: "auto",
          borderRadius: "40px",
        }}
      >
        <div className="text">
          <h2>{tutorProfile.name}</h2>
          <p>{tutorProfile.description}</p>
          <div>
            <span
              onClick={handleCopyLink}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {" "}
              share Profile
            </span>
          </div>
        </div>
        <div className="Pg">
          <div className="userleftportion">
            <div className="userprofileBox">
              <div className="Image">
                <img
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={tutorProfile.image}
                  alt={tutorProfile.name}
                />
              </div>
              <div className="chatbtn">
                <button>Chat Now</button>
              </div>
              <div className="cardbody">
                <div>
                  <div className="profileattributes">
                    <span>
                      <b>Interest : </b>
                      <br />
                    </span>
                    <span>{tutorProfile.description}</span>
                  </div>
                  <div className="profileattributes">
                    <span>
                      <b>Rate Per Call : </b>
                    </span>
                    <span>{tutorProfile.hourlyRate}</span>
                  </div>
                  <div className="profileattributes">
                    <span>
                      <b>Voice / Video Call : </b>
                    </span>
                    <span>Both</span>
                  </div>
                  <div className="profileattributes">
                    <span>
                      <b>Sessions Attended : </b>
                    </span>
                    <span>10</span>
                  </div>
                  <div className="profileattributes">
                    <span>
                      <b>Ratings : </b>
                    </span>
                    <span>8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="userrightportion">
            <div className="block">
              <h3>About The Instructor</h3>
              <hr />
              <p>{tutorProfile.description}</p>
            </div>
            <div className="block">
              <h3>Feedbacks Received</h3>
              <hr />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Expedita iusto quis maiores tempora nobis laborum, praesentium
                dolorem laboriosam quaerat quam.
              </p>
            </div>
            <div className="block">
              <h3>Book Session</h3>
              <hr />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione,
              eum!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfileUP;
