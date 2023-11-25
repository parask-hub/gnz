import React, { useState } from "react";
import "../Component/styles/ProfileEditForm.css";

const EditForm = ({ tutorDetails, onSave, onCancel, fetchData }) => {
  const [editedDetails, setEditedDetails] = useState({ ...tutorDetails });
  const [imageFile, setImageFile] = useState(null);
  const domain = "127.0.0.1";

  const BlurBackground = () => {
    return <div className="blur-background"></div>;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); // Create a FormData object to send the image file
      formData.append("image", imageFile); // Add the image file to the form data

      // Append other fields from editedDetails to the FormData
      for (const key in editedDetails) {
        formData.append(key, editedDetails[key]);
      }

      const response = await fetch(`http://${domain}:5000/api/tutor`, {
        method: "POST",
        body: formData, // Send the FormData object containing the image and other data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const savedData = await response.json();
      console.log(savedData);
      // onSave(savedData);
      fetchData();

      onCancel();
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  return (
    <>
      <BlurBackground />
      <div className="profile-edit-form">
        <div className="">
          <h1 className="text-primary">Edit Profile</h1>
          <hr />
          <button className="close-button" onClick={onCancel}>
            ✕
          </button>
          <div className="frow">
            {/* Left column */}
            <div className="flcont">
              <div className="text-center">
                <img
                  src={
                    editedDetails.image ||
                    "https://bootdey.com/img/Content/avatar/avatar7.png"
                  }
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
                <span>
                  <input
                    type="file"
                    name="image"
                    value={editedDetails.image}
                    onChange={handleImageChange}
                    style={{ width: "100%" }}
                  />
                </span>
              </div>
            </div>
            {/* Right column */}
            <div className="fcont personal-info">
              <h3>Personal info</h3>
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <span className="formlabel">Name:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={editedDetails.name}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Email:</span>
                  <span>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={editedDetails.email}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Mobile Number:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      name="mobileNumber"
                      value={editedDetails.mobileNumber}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Address:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      name="address"
                      value={editedDetails.address}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Experience:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      name="experience"
                      value={editedDetails.experience}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Area of Interest:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      name="areaOfInterest"
                      value={editedDetails.areaOfInterest}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Rate:</span>
                  <span>
                    <input
                      className="form-control"
                      type="number"
                      name="rate"
                      value={editedDetails.rate}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Description:</span>
                  <span>
                    <textarea
                      className="form-control"
                      name="description"
                      value={editedDetails.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </span>
                </div>
                {/* Additional fields */}
                <div className="form-group">
                  <span className="formlabel">Video Call Availability:</span>
                  <span>
                    <input
                      type="checkbox"
                      name="videoCallAvailability"
                      checked={editedDetails.videoCallAvailability}
                      onChange={() =>
                        setEditedDetails((prevDetails) => ({
                          ...prevDetails,
                          videoCallAvailability:
                            !prevDetails.videoCallAvailability,
                        }))
                      }
                    />
                  </span>
                </div>
                {/* End of additional fields */}
                <div className="button-group">
                  <button type="submit" className="submit-btn">
                    Save
                  </button>
                  <button className="pro-close-btn" onClick={onCancel}>
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

export default EditForm;
