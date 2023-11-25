import React from "react";
import "../Component/styles/TutorProfileUP.css";

const TutorProfilePage = ({ tutorProfile }) => {
  const domain = "127.0.0.1";
  return (
    <div>
      <div
        className="con"
        style={{
          background: "#dad9d9",
          width: "100vw",
          margin: "auto",
          borderRadius: "40px",
          overflowX: "hidden",
        }}
      >
        <div className="text">
          <h2>{tutorProfile.name}</h2>
          <p>{tutorProfile.description}</p>
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
                  src={`http://${domain}:5000/${tutorProfile.image}`}
                  alt={tutorProfile.name}
                />
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
                    <span>{tutorProfile.rate}</span>
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
};

export default TutorProfilePage;
