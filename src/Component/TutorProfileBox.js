import React from "react";
import "./TutorProfileBox.css";

function TutorProfileBox() {
  return (
    <div className="profileBox">
      <div className="leftportion">
        <div>
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
            alt=""
            style={{
              height: "80px",
              width: "80px",
              background: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "12px",
          }}
        >
          <p>Orders : 1082</p>
        </div>
      </div>
      <div className="rightportion">
        <h3>Nishant Jindal</h3>

        <span style={{ fontSize: "13px" }}>
          SDE / TIET / ML / AI / Love to talk / Career Guidance
        </span>
        <div className="rightbottom">
          <div>
            <b>Rs 100/Hr</b>
          </div>
          <div>
            <button>chat Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfileBox;
