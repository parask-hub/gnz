import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/TutorProfileUP.css";

function TutorProfileUP({ firstname, lastname, mobileNumber }) {
  const { tutorId } = useParams();
  const [tutorProfile, setTutorProfile] = useState(null);

  useEffect(() => {
    // Fetch tutor profile data based on tutorId
    fetch(`http://localhost:5000/api/tutor/tutorget/${tutorId}`)
      .then((response) => response.json())
      .then((data) => setTutorProfile(data))
      .catch((error) =>
        console.error("Error fetching tutor profile data:", error)
      );
  }, [tutorId]);

  const handleCopyLink = () => {
    if (tutorProfile) {
      const tutorProfileLink = `${window.location.origin}/tutor-profile/${tutorProfile._id}`;
      navigator.clipboard
        .writeText(tutorProfileLink)
        .then(() => alert("Link copied to clipboard"))
        .catch((error) => console.error("Unable to copy to clipboard", error));
    }
  };

  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  console.log(userData.firstname);
  const handleChatNowClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/service/chat/sendemail/${tutorProfile._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userName: `${userData.firstname}  ${userData.lastname}`, // Replace with the user's name
            // userEmail: "user@example.com", // Replace with the user's email
            userMobile: `${userData.mobileNumber}`, // Replace with the user's mobile number
          }),
        }
      );

      if (response.status === 200) {
        alert("Chat request sent to the tutor.");
      } else {
        alert("Failed to send chat request. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending chat request:", error);
    }
  };

  if (!tutorProfile) {
    return <div>Loading...</div>;
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
                  src={`http://localhost:5000/${tutorProfile.image}`}
                  alt={tutorProfile.name}
                />
              </div>
              <div className="chatbtn" onClick={handleChatNowClick}>
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
