import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, tutorProfile }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          Close
        </button>
        <h2>{tutorProfile.name}</h2>
        <p>
          <b>Email: </b>&nbsp;
          {tutorProfile.email}
        </p>
        <p>
          <b>Password:</b>&nbsp; {tutorProfile.password}
        </p>
        <p>
          <b>Image:</b>&nbsp;
          {tutorProfile.image}
        </p>
        <p>
          <b>Description:</b>&nbsp; {tutorProfile.description}
        </p>
        <p>
          <b>Mobile Number:</b>&nbsp;{tutorProfile.mobileNumber}
        </p>
        <p>
          <b>Address: </b>&nbsp;{tutorProfile.address}
        </p>
        <p>
          <b>Hours Meet Taken:</b>&nbsp; {tutorProfile.hoursMeetTaken}
        </p>
        <p>
          <b>Orders Count: </b>&nbsp;{tutorProfile.ordersCount}
        </p>
        <p>
          <b>Students Connected: </b>&nbsp;{tutorProfile.studentsConnected}
        </p>
        <p>
          <b>Experience:</b>&nbsp; {tutorProfile.experience}
        </p>
        <p>
          <b>Area of Interest:</b>&nbsp; {tutorProfile.areaOfInterest}
        </p>
        <p>
          <b>Rate:</b>&nbsp; {tutorProfile.rate}
        </p>
        <p>
          <b>Rating:</b>&nbsp; {tutorProfile.rating}
        </p>
        <p>
          <b>User Reviews :</b>{" "}
          {tutorProfile.userReviews && tutorProfile.userReviews.join(", ")}
        </p>
        <p>
          <b>Video Call Availability :</b>{" "}
          {tutorProfile.videoCallAvailability ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default Modal;
