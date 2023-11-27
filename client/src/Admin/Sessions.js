import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import "./Sessions.css";

const Session = () => {
  const sessionsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionData, setSessionData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const domain = "127.0.0.1";

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fetch data from the API when the component mounts or when the current page changes
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://${domain}:5000/api/session/getsessions`
      );
      // Sort sessions by startTime in descending order (newest first)
      const sortedSessions = response.data.sessions.sort(
        (a, b) => new Date(b.startTime) - new Date(a.startTime)
      );
      setSessionData(sortedSessions);
      setTotalPages(Math.ceil(sortedSessions.length / sessionsPerPage));
    } catch (error) {
      console.error("Error fetching session data:", error.message);
    }
  };

  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = Array.isArray(sessionData)
    ? sessionData.slice(indexOfFirstSession, indexOfLastSession)
    : [];

  const handleViewSession = (session) => {
    console.log("View Session with ID:", session._id);
    setIsModalOpen(true);
    setSelectedSession(session);
  };

  return (
    <div className="session-container">
      <div className="table-container">
        <table className="session-table">
          <thead>
            <tr>
              <th>ID</th>
              {/* <th>Student ID</th>
              <th>Teacher ID</th> */}
              <th>Start Time</th>
              <th>End Time</th>
              <th>Session Status</th>
              <th>Session Cost</th>
              <th>Session Type</th>
              <th>Total Session Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions.map((session) => (
              <tr key={session._id} className="table-row">
                <td className="ids">{session._id}</td>
                {/* <td className="ids">{session.studentId}</td>
                <td className="ids">{session.teacherId}</td> */}
                <td>{session.startTime}</td>
                <td>{session.endTime}</td>
                <td>{session.sessionStatus}</td>
                <td>{session.sessionCost}</td>
                <td>{session.sessionType}</td>
                <td>{session.totalSessionTime}</td>
                <td className="actions-column">
                  <button
                    className="view-btn"
                    onClick={() => handleViewSession(session)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        sessionData={selectedSession}
      />
    </div>
  );
};

export default Session;
