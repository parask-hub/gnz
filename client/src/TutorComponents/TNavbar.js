import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import TutorProfilePage from "./TutorProfilePage";
import TProfileEditForm from "./TProfileEditForm";
import NotificationBox from "./NotificationBox";
import axios from "axios";

Modal.setAppElement("#root"); // Set the root element for accessibility

function TNavbar({ tutorId, tutorProfile }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  const openEditProfile = () => {
    setEditProfileOpen(true);
  };

  const closeEditProfile = () => {
    setEditProfileOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [count, setCount] = useState(0);

  const fetchNotificationCount = () => {
    axios
      .get(`http://localhost:5000/api/notification/count/${tutorId}`)
      .then((response) => {
        setCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching notification count:", error);
      });
  };
  useEffect(() => {
    // Fetch the initial notification count
    fetchNotificationCount();

    // Poll for the notification count every 30 seconds
    const intervalId = setInterval(fetchNotificationCount, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [tutorId]);

  return (
    <div
      style={{
        padding: "10px",
        background: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <p className="log">
        <img
          src="https://png.pngtree.com/element_our/sm/20180518/sm_5afec7f1592f4.jpg"
          width="40px"
          alt="logo"
        />{" "}
        <span>
          <h1>GenZ</h1>
        </span>
      </p>
      <button onClick={openModal}>
        View Notification &nbsp; <b>{count}</b>
      </button>

      <span onClick={openEditProfile}>Edit Profile</span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Notification Modal"
      >
        <div>
          {/* Content for the notification modal */}
          {/* You can render any information related to the notification here */}
          {/* For example: */}
          <NotificationBox tutorId={tutorId} />

          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
      {isEditProfileOpen && (
        <TProfileEditForm
          handleClose={closeEditProfile}
          tutorId={tutorId}
          tutorProfile={tutorProfile}
          // setLoggedUser={setLoggedUser}
        />
      )}
    </div>
  );
}

export default TNavbar;
