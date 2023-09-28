import React from "react";
import "./UserProfile.css";

function UserProfile() {
  return (
    <>
      <div className="text">
        <h2>Nishan Jindal</h2>
        <p>Your Personal English Tutor</p>
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
            <div>
              <button>Chat Now</button>
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
                    <b>Rate Per Call : </b>
                  </span>
                  <span>MyBio</span>
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
                  <span>MyBio</span>
                </div>
                <div className="profileattributes">
                  <span>
                    <b>Ratings : </b>
                  </span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="userrightportion">
          <div className="block">
            <h3>About The Instructor</h3>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum nobis repellat laudantium assumenda at suscipit aut
              doloremque modi debitis sequi!
            </p>
          </div>
          <div className="block">
            <h3>Feedbacks Recieved</h3>
            <hr />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Assumenda aut porro, magni rerum distinctio maxime.
            </p>
          </div>
          <div className="block">
            <h3>Book Session</h3>
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
