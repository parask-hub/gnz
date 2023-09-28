import React from "react";
import "./UserProfile.css";

function UserProfile() {
  return (
    <>
      <div className="text">
        <h2>Abhinav Garg</h2>
        <p>Welcome to your profile</p>
      </div>
      <hr />
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
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                alt=""
              />
            </div>
            <div className="cardbody">
              <div>
                <div className="profileattributes">
                  <span>
                    <b>Interest : </b>
                  </span>
                  <span>MyBio</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>Achievements : </b>
                  </span>
                  <span>MyBio</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>Gender : </b>
                  </span>
                  <span>MyBio</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>English Fluency: </b>
                  </span>
                  <span>MyBio</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>Sessions Attended : </b>
                  </span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="userrightportion">
          <div className="block">
            <h3>Previous Session History</h3>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum nobis repellat laudantium assumenda at suscipit aut
              doloremque modi debitis sequi!
            </p>
          </div>
          <div className="block">
            <h3>Wallet Details</h3>
            <hr />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Assumenda aut porro, magni rerum distinctio maxime.
            </p>
          </div>
          <div className="block">
            <h3>Feedback Recieved</h3>
            <hr />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            voluptatem atque eveniet eos vitae magnam officia quidem quo
            cupiditate deleniti?
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
