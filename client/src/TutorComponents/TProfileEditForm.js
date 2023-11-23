import React, { useState } from "react";
import axios from "axios";
import "../Component/styles/ProfileEditForm.css";

const TProfileEditForm = ({ handleClose, tutorId, tutorProfile }) => {
  const [name, setname] = useState(tutorProfile.name);
  const [image, setImage] = useState(null);
  const [rate, setRate] = useState(tutorProfile.rate);
  const [areaOfInterest, setAreaOfInterest] = useState(
    tutorProfile.areaOfInterest
  );
  const [description, setDescription] = useState(tutorProfile.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("areaOfInterest", areaOfInterest);
    formData.append("rate", rate);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }
    console.log(formData);
    try {
      const response = await fetch(
        `http://localhost:5000/api/tutor/tutoredit/${tutorId}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            // Add any other headers as needed
            // 'Authorization': 'Bearer YourAccessToken',
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Teacher information updated successfully:", data);
        // Add any additional logic you want to perform after a successful update
      } else {
        console.error("Failed to update teacher information");
        // Handle the error, show a message, etc.
      }
    } catch (error) {
      console.error("Error updating teacher information:", error);
      // Handle the error, show a message, etc.
    }
  };

  const BlurBackground = () => {
    return <div className="blur-background"></div>;
  };

  return (
    <>
      <BlurBackground />
      <div className="profile-edit-form">
        <div className="">
          <h1 className="text-primary">Edit Profile</h1>
          <hr />
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
          <div className="frow">
            <div className="flcont">
              <div className="text-center">
                {tutorProfile && tutorProfile.image && (
                  <img
                    src={`http://localhost:5000/${tutorProfile.image}`}
                    className="avatar img-circle img-thumbnail"
                    alt="avatar"
                  />
                )}
                <span>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ width: "100%" }}
                  />
                </span>
              </div>
            </div>
            <div className="fcont personal-info">
              <h3>Personal info</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <span className="formlabel">Name:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Area Of Interest:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      value={areaOfInterest}
                      onChange={(e) => setAreaOfInterest(e.target.value)}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Rate Per Call :</span>
                  <span>
                    <input
                      className="form-control"
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Description :</span>
                  <span>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </span>
                </div>
                <div className="button-group">
                  <button type="submit" className="submit-btn">
                    Save
                  </button>
                  <button className="pro-close-btn" onClick={handleClose}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  );
};

export default TProfileEditForm;
