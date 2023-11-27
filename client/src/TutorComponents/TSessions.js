import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import "./TSession.css";

const TSessions = ({ tutorId }) => {
  const [sessions, setSessions] = useState([]);

  const markAsCompleted = async (sessionId, isChecked) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/session/sessionstatuscompleted",
        {
          sessionId: sessionId,
          sessionStatus: isChecked ? "completed" : "ongoing",
        }
      );
      alert("Marked As Completed");
      fetchSessions();
      console.log(response.data);
    } catch (error) {
      console.error("Error marking session as completed:", error);
      // Handle the error as needed
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/session/getsession/tutor/${tutorId}`
      );
      setSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/session/getsession/tutor/${tutorId}`
        );
        setSessions(response.data.sessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [tutorId]);

  const formId = "1FAIpQLScVFSPfLUwbG0_6XV0VW0zOXJJynb3fw5BeVsBMa2j0JthHUA"; // Replace with your actual form ID

  return (
    <div className="Tcontainer">
      <h2>Sessions for Teacher ID: {tutorId}</h2>
      <table className="Tresponsive-table">
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Actions</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session._id}
              className={
                session.sessionStatus === "completed" ? "completed-row" : ""
              }
            >
              <td data-label="Session ID">{session._id}</td>
              <td data-label="Actions">
                <button
                  className="Taction-button"
                  onClick={() =>
                    window.open(
                      `https://docs.google.com/forms/d/e/${formId}/viewform?usp=sf_link&entry.615642882=${session._id}`,
                      "_blank"
                    )
                  }
                >
                  Open Google Form
                </button>
              </td>
              <td data-label="Completed">
                <input
                  type="checkbox"
                  id={`completed-${session._id}`}
                  checked={session.sessionStatus === "completed"}
                  onChange={(e) =>
                    markAsCompleted(session._id, e.target.checked)
                  }
                  disabled={session.sessionStatus === "completed"}
                />
                <label htmlFor={`completed-${session._id}`}></label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TSessions;
