import React, { useState } from "react";
import "./Tutor.css"; // Make sure to have a corresponding CSS file
import tutorData from "./teacherdata";
import TutorEditForm from "./TutorEditForm";

const Tutor = () => {
  const tutorsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutorData.slice(indexOfFirstTutor, indexOfLastTutor);

  const totalPages = Math.ceil(tutorData.length / tutorsPerPage);

  const [newTutorForm, setNewTutorForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    areaOfInterest: "",
  });

  // const [showNewTutorForm, setShowNewTutorForm] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

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

  const handleAddTutorSubmit = (e) => {
    e.preventDefault();
    console.log("New Tutor Data:", newTutorForm);
    setNewTutorForm({
      name: "",
      email: "",
      mobileNumber: "",
      areaOfInterest: "",
    });
    // setShowNewTutorForm(false);
  };

  const handleEditTutor = (tutorId) => {
    console.log("Edit Tutor with ID:", tutorId);
  };

  const handleDeleteTutor = (tutorId) => {
    console.log("Delete Tutor with ID:", tutorId);
  };

  return (
    <div className="tutor-container">
      <div className="new-tutor-form">
        <button className="add-tutor-btn" onClick={openEditProfile}>
          Add New Tutor
        </button>
        {/* {showNewTutorForm && (
          <form onSubmit={handleAddTutorSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newTutorForm.name}
              onChange={handleNewTutorChange}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newTutorForm.email}
              onChange={handleNewTutorChange}
              required
            />

            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={newTutorForm.mobileNumber}
              onChange={handleNewTutorChange}
              required
            />

            <label>Area of Interest:</label>
            <input
              type="text"
              name="areaOfInterest"
              value={newTutorForm.areaOfInterest}
              onChange={handleNewTutorChange}
              required
            />

            <button type="submit">Add Tutor</button>
          </form>
        )} */}
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
            <tr key={tutor.id}>
              <td>{tutor.id}</td>
              <td>{tutor.name}</td>
              <td>{tutor.email}</td>
              <td>{tutor.mobileNumber}</td>
              <td>{tutor.areaOfInterest}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditTutor(tutor.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTutor(tutor.id)}
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
        <TutorEditForm
          onCancel={closeEditProfile}
          // data={data}
          // setLoggedUser={setLoggedUser}
        />
      )}
    </div>
  );
};

export default Tutor;
