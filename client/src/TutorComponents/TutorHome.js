import React, { useState, useEffect } from "react";
import TNavbar from "./TNavbar";
import TutorProfilePage from "./TutorProfilePage";
import TProfileEdit from "./TProfileEdit";
import TNotifications from "./TNotifications";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
  useResolvedPath,
} from "react-router-dom";

export default function TutorHome() {
  const { tutorId } = useParams();
  const [tutorProfile, setTutorProfile] = useState(null);
  const domain = "127.0.0.1";

  useEffect(() => {
    const fetchTutorProfile = async () => {
      await fetch(`http://${domain}:5000/api/tutor/tutorget/${tutorId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTutorProfile(data);
        })
        .catch((error) =>
          console.error("Error fetching tutor profile data:", error)
        );
    };

    fetchTutorProfile();
  }, [tutorId]);

  if (tutorProfile === null) {
    // Display a loading state or message while data is being fetched
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll !important",
        padding: "10px",
      }}
    >
      <TNavbar tutorId={tutorId} tutorProfile={tutorProfile} />

      <div>
        <TutorProfilePage tutorProfile={tutorProfile} />
      </div>
      {/* <TNavbar /> */}
      {/* <TutorProfilePage tutorProfile={tutorProfile} /> */}
    </div>
  );
}
