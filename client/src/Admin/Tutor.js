import React, { useState, useEffect } from "react";
import "./Tutor.css";
import TutorEditForm from "./TutorEditForm";
import Modal from "./Modal";

const Tutor = () => {
  const tutorsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorData, setTutorData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [newTutorForm, setNewTutorForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    areaOfInterest: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const domain = "127.0.0.1";

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${domain}:5000/api/tutor/tutorget`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTutorData(data);
      setTotalPages(Math.ceil(data.length / tutorsPerPage));
    } catch (error) {
      console.error("Error fetching tutor data:", error.message);
    }
  };

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = Array.isArray(tutorData)
    ? tutorData.slice(indexOfFirstTutor, indexOfLastTutor)
    : [];

  const openEditProfile = () => {
    setEditProfileOpen(true);
  };

  const closeEditProfile = () => {
    setEditProfileOpen(false);
  };

  const handleNewTutorChange = (e) => {
    const { name, value } = e.target;
    setNewTutorForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleViewTutor = ({ tutor }) => {
    console.log("Edit Tutor with ID:", tutor);
    setIsModalOpen(true);
  };

  const handleDeleteTutor = async (tutorId) => {
    try {
      const response = await fetch(
        `http://${domain}:5000/api/tutor/tutordelete/${tutorId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const updatedData = await response.json();
      setTutorData(updatedData);
      fetchData();
    } catch (error) {
      console.error("Error deleting tutor:", error.message);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="tutor-container">
      <div className="new-tutor-form">
        <button className="add-tutor-btn" onClick={openEditProfile}>
          Add New Tutor
        </button>
        <button className="refresh-btn" onClick={handleRefresh}>
          Refresh
        </button>
      </div>

      <table className="tutor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Area of Interest</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTutors.map((tutor) => (
            <tr key={tutor._id}>
              <td>{tutor._id}</td>
              <td>{tutor.name}</td>
              <td>{tutor.email}</td>
              <td>{tutor.mobileNumber}</td>
              <td>{tutor.areaOfInterest}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setSelectedTutor(tutor);
                    setIsModalOpen(true);
                  }}
                >
                  View
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTutor(tutor._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {isEditProfileOpen && (
        <TutorEditForm onCancel={closeEditProfile} fetchData={fetchData} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tutorProfile={selectedTutor}
      />
    </div>
  );
};

export default Tutor;
