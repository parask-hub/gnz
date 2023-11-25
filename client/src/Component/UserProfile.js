import React from "react";
import "./styles/UserProfile.css";

function UserProfile({ data }) {
  const domain = "127.0.0.1";
  return (
    <>
      <div className="Pg">
        <div className="userleftportion">
          <div className="userprofileBox">
            <div className="Image">
              {/* <img
                style={{
                  height: "200px",
                  width: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                alt=""
              /> */}

              {data.profilePicture != "" ? ( // Check if profilePicture exists
                <img
                  src={`http://${domain}:5000/${data.profilePicture}`} // Use the actual profile picture
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png" // Use the default image
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <div className="cardbody">
              <div>
                <div className="profileattributes">
                  <span>
                    <b>Interest : </b>
                  </span>
                  <span className="ans">{data.interest}</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>Achievements : </b>
                  </span>
                  <span className="ans">{data.achievements}</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>Gender : </b>
                  </span>
                  <span className="ans">{data.gender}</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>English Fluency: </b>
                  </span>
                  <span className="ans">{data.englishFluency}</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>Sessions Attended : </b>
                  </span>
                  <span className="ans">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="userrightportion">
          <div className="block">
            <h3>Previous Session History</h3>
            <hr />
            <p className="ans">{data.aboutMe}</p>
          </div>
          <div className="block">
            <h3>Wallet Details</h3>
            <hr />
            <p className="ans">
              <b> Your Balance : {data.coins}</b>
            </p>
          </div>
          <div className="block">
            <h3>Feedback Recieved</h3>
            <hr />
            <p className="ans">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              voluptatem atque eveniet eos vitae magnam officia quidem quo
              cupiditate deleniti?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
