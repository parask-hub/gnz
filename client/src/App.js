import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Component/Home";
import TutorProfileUP from "./Component/TutorProfileUP";
import VideoCallPage from "./Component/VideoCallPage";
import AdminHome from "./Admin/AdminHome";
import TutorLogin from "./TutorComponents/TutorLogin";
import TutorHome from "./TutorComponents/TutorHome";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useResolvedPath,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Load user data from localStorage when the app starts
    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON) {
      try {
        const userDataObj = JSON.parse(userDataJSON);
        setUserData(userDataObj);
      } catch (error) {
        console.error("Error parsing user data JSON:", error);
        // Handle the error as needed, e.g., set default user data
      }
    }
  }, []); // Empty dependency array, so it only runs once when the component mounts

  const setLoggedUser = ({ data }) => {
    setUserData(data.user);
    // Store the data in localStorage when it changes
    const userDataJSON = JSON.stringify(data.user);
    localStorage.setItem("userData", userDataJSON);
    localStorage.setItem("GenzToken", JSON.stringify(data.token));
  };

  const toggleUserState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  key={isLoggedIn}
                  isLoggedIn={isLoggedIn}
                  toggleUserState={toggleUserState}
                  setLoggedUser={setLoggedUser}
                  data={userData}
                />
              }
            />
            <Route
              path="/tutor-profile/:tutorId"
              element={
                <TutorProfileUP
                  firstname={userData.firstname}
                  lastname={userData.lastname}
                  mobileNumber={userData.mobileNumber}
                />
              }
            />
            <Route path="/admin" element={<AdminHome />} />
            <Route
              path="/VideoCalling"
              element={<VideoCallPage data={userData} />}
            />
            <Route path="/ourtutor" element={<TutorLogin />} />
            <Route path="/tutor/:tutorId" element={<TutorHome />} />
            <Route path="/tutor/:tutorId/" element={<TutorHome />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
