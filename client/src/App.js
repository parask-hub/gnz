import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Component/Home";
import TutorProfileUP from "./Component/TutorProfileUP";
import AdminHome from "./Admin/AdminHome";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useResolvedPath,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const setLoggedUser = async ({ data }) => {
    await setUserData(data);
    console.log("data = ", userData);
    console.log("data imported : ", data);
  };
  // console.log(userData);

  const toggleUserState = () => {
    setIsLoggedIn(!isLoggedIn);
    console.log("toggled : " + isLoggedIn);
  };

  // useEffect to handle side effects when isLoggedIn changes
  useEffect(() => {
    // Do something when isLoggedIn changes
    console.log("data = ", userData);
    console.log("isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn, userData]); // Dependency array to specify what variables to watch for changes

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
              element={<TutorProfileUP />}
            />
            <Route path="/admin" element={<AdminHome />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
