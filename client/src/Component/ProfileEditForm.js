import React, { useState } from "react";
import "./styles/ProfileEditForm.css";
import Popup from "./PopUp";

const ProfileEditForm = ({ handleClose, setLoggedUser, data }) => {
  const [firstname, setFirstname] = useState(data.firstname);
  const [popup, setPopup] = useState(null);
  const [lastname, setLastname] = useState(data.lastname);
  const [image, setImage] = useState("");
  const [interest, setInterest] = useState(data.interest);
  const [achievements, setAchievements] = useState(data.achievements);
  const [gender, setGender] = useState(data.gender);
  const [englishFluency, setEnglishFluency] = useState(data.englishFluency);
  const [aboutMe, setAboutMe] = useState(data.aboutMe);
  const domain = "127.0.0.1";

  console.log(image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = data._id;

    // Create a new FormData object
    const formData = new FormData();

    // Append text data to the FormData object
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("interest", interest);
    formData.append("achievements", achievements);
    formData.append("gender", gender);
    formData.append("englishFluency", englishFluency);
    formData.append("aboutMe", aboutMe);

    // Append the image file to the FormData object
    if (image) {
      formData.append("profilePicture", image);
    }

    try {
      const response = await fetch(
        `http://${domain}:5000/api/user/update/${userId}`,
        {
          method: "POST",
          body: formData, // Use the FormData object
        }
      );

      if (response.ok) {
        const data = await response.json();
        await setLoggedUser({ data: data });
        console.log("User information updated successfully:", data);
        displayPopup("Profile Updated Successfully", "success");

        setTimeout(() => {
          handleClose(); // Close the form after a successful update
        }, 3000);
      } else {
        console.error("Failed to update user information");
        displayPopup("Error in Updation", "error");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      displayPopup("Error in Updation", "error");
    }
  };

  const displayPopup = (message, type) => {
    setPopup({ message, type });

    // Close the popup after 3 seconds
    setTimeout(() => {
      setPopup(null);
    }, 3000);
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
            {/* Left column */}
            <div className="flcont">
              <div className="text-center">
                {data.profilePicture !== "" ? ( // Check if profilePicture exists
                  <img
                    src={`http://${domain}:5000/${data.profilePicture}`} // Use the actual profile picture
                    className="avatar img-circle img-thumbnail"
                    alt="avatar"
                  />
                ) : (
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png" // Use the default image
                    className="avatar img-circle img-thumbnail"
                    alt="avatar"
                  />
                )}
                <span>
                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    type="file"
                    style={{ width: "100%" }}
                  />
                </span>
              </div>
            </div>
            {/* Right column */}
            <div className="fcont personal-info">
              <h3>Personal info</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <span className="formlabel">First name:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Last name:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </span>
                </div>
                {/* New fields */}
                <div className="form-group">
                  <span className="formlabel">Interest:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Achievements:</span>
                  <span>
                    <input
                      className="form-control"
                      type="text"
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                    />
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">Gender:</span>
                  <span>
                    <span>
                      <input
                        type="radio"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                      />
                      <span>Male</span>
                    </span>
                    <span>
                      <input
                        type="radio"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                      />
                      <span>Female</span>
                    </span>
                    <span>
                      <input
                        type="radio"
                        value="other"
                        checked={gender === "other"}
                        onChange={() => setGender("other")}
                      />
                      <span>Other</span>
                    </span>
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">English Fluency:</span>
                  <span>
                    <select
                      className="form-control"
                      value={englishFluency}
                      onChange={(e) => setEnglishFluency(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </span>
                </div>
                <div className="form-group">
                  <span className="formlabel">About Me:</span>
                  <span>
                    <textarea
                      className="form-control"
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                    ></textarea>
                  </span>
                </div>
                {/* End of new fields */}
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
      {popup && <Popup message={popup.message} type={popup.type} />}
    </>
  );
};

export default ProfileEditForm;
