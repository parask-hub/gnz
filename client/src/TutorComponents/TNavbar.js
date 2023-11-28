import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import TutorProfilePage from "./TutorProfilePage";
import TProfileEditForm from "./TProfileEditForm";
import NotificationBox from "./NotificationBox";
import axios from "axios";
import TSessions from "./TSessions"; // Import the Session component or use your existing component for displaying sessions
import TWalletTransaction from "./TWalletTransaction";

Modal.setAppElement("#root"); // Set the root element for accessibility

function TNavbar({ tutorId, tutorProfile }) {
  const domain = "127.0.0.1";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isSessionModalOpen, setSessionModalOpen] = useState(false); // New state for session modal
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const openTransactionModal = () => {
    setTransactionModalOpen(true);
  };

  const closeTransactionModal = () => {
    setTransactionModalOpen(false);
  };

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

  const openSessionModal = () => {
    setSessionModalOpen(true);
  };

  const closeSessionModal = () => {
    setSessionModalOpen(false);
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
        width: "100%",
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
      <span
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <span
          onClick={openModal}
          style={{
            cursor: "pointer",
            border: "1px solid grey",
            padding: "9px",
            borderRadius: "10px",
          }}
          className="nav-btn"
        >
          <b> View Notification &nbsp; {count}</b>
        </span>

        <span
          onClick={openSessionModal} // Open the session modal on click
          style={{
            cursor: "pointer",
            border: "1px solid grey",
            padding: "9px",
            borderRadius: "10px",
          }}
          className="nav-btn"
        >
          <b> View Sessions</b>
        </span>

        <span
          onClick={openEditProfile}
          style={{
            cursor: "pointer",
            border: "1px solid grey",
            padding: "9px",
            borderRadius: "10px",
          }}
          className="nav-btn"
        >
          <b>Edit Profile</b>
        </span>

        <span
          onClick={openTransactionModal} // Open the TransactionData modal on click
          style={{
            cursor: "pointer",
            border: "1px solid grey",
            padding: "9px",
            borderRadius: "10px",
            backgroundColor: "green",
            color: "yellow",
          }}
          className="nav-btn"
        >
          <b> Wallet : {tutorProfile.coins}</b>
        </span>
      </span>

      <Modal
        isOpen={isTransactionModalOpen}
        onRequestClose={closeTransactionModal}
        contentLabel="Transaction Data Modal"
      >
        <div>
          <TWalletTransaction data={tutorId} />
          <button onClick={closeTransactionModal}>Close Modal</button>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Notification Modal"
      >
        <div>
          <NotificationBox tutorId={tutorId} />
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>

      <Modal
        isOpen={isSessionModalOpen}
        onRequestClose={closeSessionModal}
        contentLabel="Session Modal"
      >
        <div>
          <TSessions tutorId={tutorId} tutorProfile={tutorProfile} />
          <button onClick={closeSessionModal}>Close Modal</button>
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
