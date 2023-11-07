import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import SenderInfoBox from "./SenderInfoBox";

import "./NotificationBox.css"; // Import your CSS file

const NotificationBox = ({ tutorId }) => {
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [senderData, setSenderData] = useState(null);

  // ${tutorId}

  useEffect(() => {
    // Fetch notifications for the specified tutorId (as in your existing code)
    axios
      .get(`http://localhost:5000/api/notification/receive/${tutorId}/Teacher`)
      .then((response) => {
        setNotifications(response.data.noti);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [notifications]);

  const openModal = async (notification) => {
    await setSelectedNotification(notification);
    await fetchSenderData(notification.senderId).then((sender) => {
      if (sender) {
        console.log("User data:", sender);
        setSenderData(sender);
      } else {
        console.log("User not found or error fetching data.");
      }
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  const markAsRead = (notificationId) => {
    axios
      .post(`http://localhost:5000/api/notification/markread/${notificationId}`)
      .then((response) => {
        // Update the notification's "read" status in your state
        const updatedNotifications = notifications.map((notification) => {
          if (notification._id === notificationId) {
            return { ...notification, read: true };
          }
          return notification;
        });
        setNotifications(updatedNotifications);
      })
      .catch((error) => {
        console.error("Error marking notification as read:", error);
      });
  };

  const fetchSenderData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getUserData/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // Function to handle accepting the notification
  const acceptNotification = () => {
    const object = {
      senderId: tutorId,
      senderModel: "Teacher",
      receiverId: senderData._id,
      receiverModel: "User",
      message: `Your Chat Request Is Accepted`,
      status: false,
    };

    axios
      .post("http://localhost:5000/api/notification/send", object)
      .then((res) => {
        alert("notification sent");
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });
  };

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No Notifications Yet!</p>
      ) : (
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`notification ${
                notification.read ? "read" : "unread"
              }`}
              onClick={() => {
                if (!notification.read) {
                  markAsRead(notification._id); // Mark the notification as read
                }
                openModal(notification); // Open the modal
              }}
            >
              <strong>{notification.senderModel}:</strong>{" "}
              {notification.message}
              <div className="notification-timer">
                {notification.read ? (
                  "Read"
                ) : (
                  <span>
                    Unread - <span>5:00</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={modalVisible}
        onRequestClose={closeModal}
        contentLabel="Notification Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedNotification && (
          <div className="modal-content">
            {" "}
            {/* Use the new CSS class */}
            <h2>{selectedNotification.senderModel} Notification</h2>
            <p>{selectedNotification.message}</p>
            {senderData && (
              <div>
                <h3>Sender Information:</h3>
                {/* <SenderInfoBox user={senderData} /> */}
                <div className="user-profile-card">
                  <img
                    className="user-profile-image"
                    src={senderData.profilePicture}
                    alt="Profile"
                  />
                  <div className="user-profile-name">
                    {senderData.firstname} {senderData.lastname}
                  </div>
                  <div className="user-profile-details">
                    <div>
                      <span className="user-profile-detail-label">
                        Mobile Number:
                      </span>
                      <span className="user-profile-detail-value">
                        {senderData.mobileNumber}
                      </span>
                    </div>
                    <div>
                      <span className="user-profile-detail-label">
                        Interest:
                      </span>
                      <span className="user-profile-detail-value">
                        {senderData.interest}
                      </span>
                    </div>
                    <div>
                      <span className="user-profile-detail-label">Gender:</span>
                      <span className="user-profile-detail-value">
                        {senderData.gender}
                      </span>
                    </div>
                    <div>
                      <span className="user-profile-detail-label">
                        About Me:
                      </span>
                      <span className="user-profile-detail-value">
                        {senderData.aboutMe}
                      </span>
                    </div>
                    <div>
                      <span className="user-profile-detail-label">Coins:</span>
                      <span className="user-profile-detail-value">
                        {senderData.coins}
                      </span>
                    </div>
                    <div>
                      <span className="user-profile-detail-label">
                        English Fluency:
                      </span>
                      <span className="user-profile-detail-value">
                        {senderData.englishFluency}
                      </span>
                    </div>
                    <div>
                      <span className="user-profile-detail-label">
                        Achievements:
                      </span>
                      <span className="user-profile-detail-value">
                        {senderData.achievements}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Display user information and accept button as needed */}
            <button className="modal-button" onClick={acceptNotification}>
              Accept
            </button>
            <button className="modal-button" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotificationBox;
