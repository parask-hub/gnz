import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./Firebase/firebaseconfig";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import "./styles/SettingPage.css";
import Popup from "./PopUp"; // Import the Popup component

const BlurBackground = () => {
  return <div className="blur-background"></div>;
};

const LoginForm = ({ handleCloseForm }) => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://example.com/profile-photo.jpg"
  );
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOtp, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null); // State for managing popups
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSignup();
        },
        "expired-callback": () => {},
      }
    );
  }, []);

  const displayPopup = (message, type) => {
    setPopup({ message, type });

    // Close the popup after 3 seconds
    setTimeout(() => {
      setPopup(null);
    }, 3000);
  };

  const onSignup = () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        displayPopup("OTP sent successfully", "success");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // displayPopup("Error sending OTP", "error");
      });
  };

  const onOtpVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        displayPopup("Login successful", "success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        displayPopup("Invalid OTP. Please try again.", "error");
      });
  };

  const onCaptchaVerify = () => {
    // Already created in useEffect
  };

  return (
    <>
      <BlurBackground />
      <div id="recaptcha-container"></div>
      <div className="SettingsPage">
        <button className="close-button" onClick={handleCloseForm}>
          ✕
        </button>
        <h1>Login Form</h1>
        {user ? (
          <div>
            <div className="namefield">
              <p>Enter Your Name:</p>
              <div className="input-box">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* <button className="button" onClick={onRegister}> */}
            <button className="button">
              {loading && (
                <img
                  src="https://i.gifer.com/ZKZx.gif"
                  height={"20px"}
                  style={{ marginRight: "5px" }}
                />
              )}
              Register
            </button>
          </div>
        ) : (
          <div>
            {showOtp ? (
              <div>
                <div className="numberfields otp">
                  Enter OTP :
                  <span>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      type="text"
                      placeholder="Enter 6 digit OTP"
                    />
                  </span>
                </div>

                <button className="button" onClick={onOtpVerify}>
                  {loading && (
                    <img
                      src="https://i.gifer.com/ZKZx.gif"
                      height={"20px"}
                      style={{ marginRight: "5px" }}
                    />
                  )}
                  Verify OTP
                </button>
              </div>
            ) : (
              <div>
                <div className="numberfields">
                  Enter Your Number :
                  <span>
                    <PhoneInput country={"in"} value={ph} onChange={setPh} />
                  </span>
                </div>

                <button onClick={onSignup} className="button">
                  {loading && (
                    <img
                      src="https://i.gifer.com/ZKZx.gif"
                      height={"20px"}
                      style={{ marginRight: "5px" }}
                    />
                  )}
                  <span>Send Code Via SMS</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popup component */}
      {popup && <Popup message={popup.message} type={popup.type} />}
    </>
  );
};

export default LoginForm;
