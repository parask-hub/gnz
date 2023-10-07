import React from "react";
import "./styles/ContentBox.css";

function ContentBox({ title, description }) {
  return (
    <div className="box">
      <p>
        <div
          style={{
            padding: "5px",
            fontSize: "16px",
            borderRadius: "40px",
          }}
        >
          <b>{title}</b>
        </div>
        {/* <br></br> */}
        <span className="description">{description}</span>
      </p>
    </div>
  );
}

export default ContentBox;
