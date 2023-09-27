import React from "react";
import "./ContentBox.css";

function ContentBox({ title, description }) {
  return (
    <div className="box">
      <p>
        <span className="title">
          <b>{title}</b>
        </span>
        <br></br>
        <br></br>
        <span className="description">{description}</span>
      </p>
    </div>
  );
}

export default ContentBox;
