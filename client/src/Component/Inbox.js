import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./styles/Inbox.css";

const domain = "127.0.0.1";
const NotificationBox = ({ data }) => {
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [senderData, setSenderData] = useState(null);
  const [showAcceptedRequests, setShowAcceptedRequests] = useState(false);

  const openMeetLink = (link) => {
    window.open(link, "_blank"); // Opens the link in a new tab or window
  };

  useEffect(() => {
    // Fetch notifications for the specified tutorId (as in your existing code)
    axios
      .get(`http://${domain}:5000/api/notification/receive/${data._id}/Teacher`)
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
      .post(`http://${domain}:5000/api/notification/markread/${notificationId}`)
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
        `http://${domain}:5000/api/user/getUserData/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const handleToggleAcceptedRequests = () => {
    setShowAcceptedRequests(!showAcceptedRequests);
  };

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <div className="inbox-container">
        <h2>Notifications</h2>
        <div className="toggle-buttons">
          <button onClick={handleToggleAcceptedRequests}>
            Accepted Requests
          </button>
          <button onClick={() => setShowAcceptedRequests(false)}>
            Inbox Notifications
          </button>
        </div>
        {showAcceptedRequests ? (
          <div>Here Are The Accepted Request</div>
        ) : (
          <div>
            {notifications.length === 0 ? (
              <p>No Notifications Yet!</p>
            ) : (
              <div>
                {notifications
                  .filter((notification) => notification.state === "active")
                  .map((notification, index) => (
                    <div
                      key={index}
                      className={`inbox ${
                        notification.read ? "read" : "unread"
                      }`}
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification._id); // Mark the notification as read
                        }
                        openModal(notification); // Open the modal
                      }}
                    >
                      <strong>{notification.senderModel}:</strong> Your Request
                      To Join The Meet Is accepted <br />
                      <button
                        onClick={() => openMeetLink(notification.message)}
                      >
                        Open Meet Link
                      </button>
                      <div className="inbox-timer">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationBox;
