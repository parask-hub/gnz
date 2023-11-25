import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TutorLogin.css";
import { Navigate } from "react-router-dom";

const TutorLogin = () => {
  const [loading, setLoading] = useState(false);
  const [tutorId, settutorId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const domain = "127.0.0.1";

  useEffect(() => {
    const tokenInterval = setInterval(() => {
      // Refresh the access token every 14 minutes
      axios
        .post(`http://${domain}:5000/api/tutor/refresh-token`, { refreshToken })
        .then((response) => {
          setAccessToken(response.data.accessToken);
        })
        .catch((error) => {
          console.error("Error refreshing access token:", error);
        });
    }, 840000); // 14 minutes in milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(tokenInterval);
  }, [refreshToken]);

  const handleLogin = () => {
    setLoading(true);

    axios
      .post(`http://${domain}:5000/api/tutor/login`, { username, password })
      .then((response) => {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        console.log("my interest :", response);
        settutorId(response.data.id);
        setLoggedIn(true);
      })
      .catch((error) => {
        setLoading(false);
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="t-tutor-container">
      {loggedIn ? (
        <Navigate to={`/tutor/${tutorId}`} />
      ) : (
        <div className="t-form-container">
          <h2>Tutor Login</h2>
          <hr />
          <div className="t-input">
            <div className="input-field">
              <span>
                <b>Username &nbsp;</b>{" "}
              </span>
              <input
                placeholder="Email or Mobile Number"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-field">
              <span>
                <b>Password &nbsp;</b>{" "}
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button" onClick={handleLogin}>
              {loading && (
                <img
                  src="https://i.gifer.com/ZKZx.gif"
                  height={"20px"}
                  style={{ marginRight: "5px" }}
                />
              )}
              Login
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorLogin;
