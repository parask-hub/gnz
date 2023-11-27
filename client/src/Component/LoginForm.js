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

const LoginForm = ({ handleCloseForm, toggleUserState, setLoggedUser }) => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://example.com/profile-photo.jpg"
  );
  const domain = "127.0.0.1";
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOtp, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null); // State for managing popups
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    console.log("ph:", ph);
  }, [ph]); // Run the effect whenever 'ph' changes

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

  const onSignup = async () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = `+${ph.replace(/\D/g, "")}`;
    console.log(formatPh);

    // Using the callback function to log the updated state
    // await setPh(formatPh);

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        displayPopup("OTP sent successfully", "success");

        // Set isNewUser when OTP is sent
        // setIsNewUser(confirmationResult._tokenResponse?.isNewUser);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        displayPopup("Error sending OTP", "error");
      });
  };

  const onOtpVerify = async () => {
    setLoading(true);

    try {
      const authResult = await window.confirmationResult.confirm(otp);

      if (authResult && authResult.user) {
        await setUser(authResult.user);
        displayPopup("OTP Verified", "success");

        console.log("ph in verifiction is: ", ph);
        // Check if the user exists on the server
        const response = await fetch(
          `http://${domain}:5000/api/auth/isuserexist/+${ph}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("User exists on the server:", data.exists);

          await setIsNewUser(!data.exists);

          if (data.exists) {
            // Perform actions for existing users
            await registerUser();
          }
        } else {
          console.error("Error checking user existence:", response.statusText);
          displayPopup("Error checking user existence", "error");
        }
      } else {
        console.error("Invalid user data in confirmation result");
        displayPopup("Invalid user data", "error");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      displayPopup("Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    setLoading(true);
    console.log("register starts");

    try {
      const userData = {
        mobileNumber: "+" + ph,
        firstname: firstName,
        lastname: lastName,
      };

      // Make an API request to register the user using fetch
      const registrationResponse = await fetch(
        `http://${domain}:5000/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      console.log("data passed");

      // Check if the response is successful
      if (!registrationResponse.ok) {
        throw new Error("Error in Creating account");
      }

      // Parse the JSON response
      console.log("Response Taken");
      const responseData = await registrationResponse.json();
      console.log("it should happen and take response ");
      console.log(responseData);
      await setUser(responseData.user);
      await setLoggedUser({ data: responseData });

      console.log("Working");
      console.log("user data  : " + user);
      displayPopup("Account Created successfully", "success");
    } catch (error) {
      // Handle errors
      console.error(error);
      displayPopup("Error in Creating account", "error");
    } finally {
      setLoading(false);
      toggleUserState();
    }
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
        {isNewUser ? (
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

            <button className="button" onClick={registerUser}>
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
                    <PhoneInput
                      country={"in"}
                      value={ph}
                      onChange={(value, country, event, formattedValue) => {
                        setPh(value);
                      }}
                    />
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
