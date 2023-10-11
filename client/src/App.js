import React from "react";
import "./App.css";
import Home from "./Component/Home";
import TutorProfileUP from "./Component/TutorProfileUP"; // Import the TutorProfileUP component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Toaster from "react-hot-toast";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/tutor-profile/:tutorId"
              element={<TutorProfileUP />}
            />{" "}
            {/* New route for TutorProfileUP */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
