import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import SenderInfoBox from "./SenderInfoBox";
import { v4 as uuidv4 } from "uuid";
import "./NotificationBox.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
// const { google } = require("googleapis");
// const { authenticate } = require("@google-cloud/local-auth");
const credentials = require("./credential.json");

const NotificationBox = ({ tutorId }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [senderData, setSenderData] = useState(null);
  const [activeTab, setActiveTab] = useState("inbox"); // Added state for active tab
  const domain = "127.0.0.1";
  // const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

  useEffect(() => {
    // Fetch notifications for the specified tutorId (as in your existing code)
    axios
      .get(`http://${domain}:5000/api/notification/receive/${tutorId}/Teacher`)
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

  const acceptNotification = async () => {
    const roomName = uuidv4();
    const domain = "meet.jit.si";
    const meetLink = `http://${domain}/${roomName}`;
    const backendDomain = "127.0.0.1";

    // Move to the VideoCalling route with the roomName as a query parameter
    window.open(`/VideoCalling?roomName=${roomName}`, "_blank");
    // navigate(`/VideoCalling?roomName=${roomName}`);
    const object = {
      senderId: tutorId,
      senderModel: "Teacher",
      receiverId: senderData._id,
      receiverModel: "User",
      message: `${meetLink}`,
      status: false,
      // state: "accepted",
    };

    await axios
      .post(`http://localhost:5000/api/notification/send`, object)
      .then((res) => {
        const notificationId = res.data.notificationId;
        // try {
        //   axios.put(
        //     `http://localhost:5000/api/notification/accept/${notificationId}`
        //   );

        //   // Handle the response as needed
        //   console.log("Notification state updated:", res.data);
        // } catch (error) {
        //   // Handle errors
        //   console.error("Error updating notification state:", error);
        // }
        alert("notification sent");
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });
  };

  // const acceptNotification = async () => {
  //   try {
  //     const auth = await authenticate({
  //       keyFile: "./path/to/credentials.json",
  //       scopes: SCOPES,
  //     });

  //     const calendar = google.calendar({ version: "v3", auth });

  //     // Get the current time
  //     const currentTime = new Date();

  //     // Set the start time as the current time
  //     const startTime = currentTime.toISOString();

  //     // Set the end time as 1 hour after the current time
  //     const endTime = new Date(currentTime);
  //     endTime.setHours(currentTime.getHours() + 1);

  //     // Create the Google Calendar event
  //     const event = {
  //       summary: "Meeting Title",
  //       location: "Meeting Location",
  //       description: "Meeting Description",
  //       start: {
  //         dateTime: startTime,
  //         timeZone: "Asia/Kolkata",
  //       },
  //       end: {
  //         dateTime: endTime.toISOString(),
  //         timeZone: "Asia/Kolkata",
  //       },
  //       conferenceData: {
  //         createRequest: {
  //           requestId: "your-unique-id",
  //         },
  //       },
  //     };

  //     // Insert the event and get the Google Meet link
  //     const res = await calendar.events.insert({
  //       calendarId: "primary",
  //       resource: event,
  //       conferenceDataVersion: 1,
  //     });

  //     // Extract and display the Google Meet link
  //     console.log("Event created: %s", res.data.htmlLink);
  //   } catch (err) {
  //     console.error("Error creating event:", err);
  //   }
  // };

  // const acceptNotification = async (response) => {
  //   try {
  //     const accessToken = response.accessToken;

  //     // Authenticate with the Google Calendar API
  //     const auth = await authenticate({
  //       token: accessToken,
  //     });

  //     // Create a Google Calendar event with a Google Meet link
  //     const calendar = google.calendar({ version: "v3", auth });
  //     const event = {
  //       summary: "Meeting Title",
  //       description: "Meeting Description",
  //       start: {
  //         dateTime: new Date().toISOString(),
  //         timeZone: "Asia/Kolkata",
  //       },
  //       end: {
  //         dateTime: new Date(
  //           new Date().getTime() + 60 * 60 * 1000
  //         ).toISOString(), // 1 hour later
  //         timeZone: "Asia/Kolkata",
  //       },
  //       conferenceData: {
  //         createRequest: {
  //           requestId: "your-unique-id",
  //         },
  //       },
  //     };

  //     const calendarEvent = await calendar.events.insert({
  //       calendarId: "primary",
  //       resource: event,
  //       conferenceDataVersion: 1,
  //     });

  //     // Extract the Google Meet link and use it as needed
  //     const meetLink = calendarEvent.data.hangoutLink;
  //     console.log("Google Meet link:", meetLink);

  //     // Now you can use the meetLink as needed, e.g., store it, display it, or share it
  //   } catch (err) {
  //     console.error("Error creating event:", err);
  //   }
  // };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Sign-In failed:", error);
  };

  // const handleAcceptButtonClick = async () => {
  // try {
  //   // Trigger Google Sign-In by calling the signIn method on the GoogleLogin component
  //   if (googleLoginRef.current) {
  //     googleLoginRef.current.signIn();
  //   }
  // } catch (err) {
  //   console.error("Error handling accept button click:", err);
  // }
  // };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // to update the coins
  const coinsToAdd = 123;
  const onMeetEnd = async () => {
    try {
      const response = await axios.put(
        `/api/teachers/update-coins/${tutorId}`,
        {
          coins: coinsToAdd,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <div className="tabs">
        <div
          className={`tab ${activeTab === "inbox" ? "active" : ""}`}
          onClick={() => handleTabClick("inbox")}
        >
          Inbox
        </div>
        <div
          className={`tab ${activeTab === "accepted" ? "active" : ""}`}
          onClick={() => handleTabClick("accepted")}
        >
          Accepted Requests
        </div>
      </div>
      {activeTab === "inbox" ? (
        <div>
          {notifications.length === 0 ? (
            <p>No Notifications Yet!</p>
          ) : (
            <div>
              {notifications
                .filter(
                  (notification) =>
                    notification.state === "active" ||
                    notification.state == "accepted"
                )
                .map((notification, index) => (
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
        </div>
      ) : (
        <div>Here are the accepted request</div>
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
            {/* <GoogleLogin
              clientId="YOUR"
              buttonText="Login with Google"
              onSuccess={acceptNotification} // Triggers on successful Google Sign-In
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={"single_host_origin"}
            /> */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotificationBox;
