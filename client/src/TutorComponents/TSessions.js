import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./TSession.css";

const TSessions = ({ tutorId, tutorProfile }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionDuration, setSessionDuration] = useState("");

  const markAsCompleted = async (session, isChecked) => {
    if (!isChecked) {
      return;
    }

    // Open the modal to enter session duration
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleSubmitDuration = async () => {
    try {
      // Perform the desired action with sessionDuration

      const amount = sessionDuration * tutorProfile.rate;
      console.log(selectedSession);

      const coinsResponse = await axios.put(
        `http://localhost:5000/api/user/updatecoins/${selectedSession.studentId}`,
        {
          action: "decrease",
          amount,
        }
      );

      const transactionresponse = await axios.post(
        "http://localhost:5000/api/service/addwallet",
        {
          userId: selectedSession.studentId,
          userType: "student", // or "teacher" based on user type
          amount,
          type: "debit",
          reason: `Session with ${tutorProfile.name}`,
        }
      );
      console.log("Transaction added successfully:", transactionresponse.data);
      // You can update the UI or show a success message

      console.log(coinsResponse.data); // Log the response from the backend

      const tutorresponse = await axios.put(
        `http://localhost:5000/api/tutor/update-coins/${selectedSession.teacherId}`,
        {
          coins: amount,
        }
      );

      console.log(tutorresponse.data);

      const response = await axios.post(
        "http://localhost:5000/api/session/sessionstatuscompleted",
        {
          sessionId: selectedSession._id,
          sessionStatus: "completed",
        }
      );

      const tutortransactionresponse = await axios.post(
        "http://localhost:5000/api/service/addwallet",
        {
          userId: tutorProfile._id,
          userType: "teacher", // or "teacher" based on user type
          amount,
          type: "credit",
          reason: `Session with ${selectedSession.studentId}`,
        }
      );
      console.log(
        "Transaction added successfully:",
        tutortransactionresponse.data
      );

      alert("Marked As Completed");
      fetchSessions();
      console.log(response.data);
    } catch (error) {
      console.error("Error marking session as completed:", error);
      // Handle the error as needed
    }

    // Close the modal and reset state
    setIsModalOpen(false);
    setSelectedSession(null);
    setSessionDuration("");
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
          {sessions
            .slice()
            .reverse()
            .map((session) => (
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
                    disabled={session.sessionStatus === "completed"}
                  >
                    Open Google Form
                  </button>
                </td>
                <td data-label="Completed">
                  <input
                    type="checkbox"
                    id={`completed-${session._id}`}
                    checked={session.sessionStatus === "completed"}
                    onChange={(e) => markAsCompleted(session, e.target.checked)}
                    disabled={session.sessionStatus === "completed"}
                  />
                  <label htmlFor={`completed-${session._id}`}></label>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Session Duration Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <span className="close" onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          <h2>Enter Session Duration</h2>
          <input
            type="number"
            placeholder="Enter duration in minutes"
            value={sessionDuration}
            onChange={(e) => setSessionDuration(e.target.value)}
          />
          <button className="durationBtn" onClick={handleSubmitDuration}>
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TSessions;
