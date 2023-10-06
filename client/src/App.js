import React from "react";
import "./App.css";
import Home from "./Component/Home";
import TutorProfileUP from "./Component/TutorProfileUP"; // Import the TutorProfileUP component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
