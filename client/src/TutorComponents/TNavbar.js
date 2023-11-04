import React, { useState } from "react";
import Modal from "react-modal";
import TutorProfilePage from "./TutorProfilePage";
import NotificationBox from "./NotificationBox";

Modal.setAppElement("#root"); // Set the root element for accessibility

function TNavbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
      <button onClick={openModal}>View Notification</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Notification Modal"
      >
        <div>
          {/* Content for the notification modal */}
          {/* You can render any information related to the notification here */}
          {/* For example: */}
          <NotificationBox />

          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </div>
  );
}

export default TNavbar;
