import React, { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import axios from "axios";

function VideoCallPage({ data }) {
  const domain = "meet.jit.si";
  const backendDomain = "127.0.0.1";
  const [roomName, setRoomName] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState(null);
  const [timer, setTimer] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [totalSessionTime, setTotalSessionTime] = useState(0);
  let timerElement = document.querySelector(".css-h6c4xs-timer");
  const joinedParticipants = {};

  useEffect(() => {
    timerElement = document.querySelector(".css-h6c4xs-timer");
    if (timerElement) {
      const timerContent = timerElement.textContent;
      setTimer(timerContent);
      console.log("Content of .css-h6c4xs-timer:", timer);
    }
  }, [timerElement]);

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roomNameFromQuery = queryParams.get("roomName");
    const generatedRoomName = roomNameFromQuery || uuidv4();
    setRoomName(generatedRoomName);
  }, [location.search]);

  const configOverwrite = {
    startWithAudioMuted: true,
    disableModeratorIndicator: true,
    startScreenSharing: true,
    enableEmailInStats: false,
  };

  const interfaceConfigOverwrite = {
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  };

  const userInfo = {
    displayName: `${data.firstname} ${data.lastname}`,
  };

  const handleIFrameRef = (iframeRef) => {
    if (iframeRef) {
      iframeRef.style.width = "100%";
      iframeRef.style.height = "100vh";
    }
  };

  // const handleApiReady = (api) => {
  //   console.log("HandleApI Ready called");
  //   setMeetingStartTime(Date.now());

  //   api.addEventListener("participantJoined", handleParticipantJoined);
  //   api.addEventListener("participantLeft", handleParticipantLeft);
  // };

  // const handleParticipantJoined = (participant) => {
  //   console.log("here the participant enters");
  //   joinedParticipants[participant.id] = Date.now();
  // };

  // const handleParticipantLeft = (participant) => {
  //   const joinTime = joinedParticipants[participant.id];
  //   const leaveTime = Date.now();
  //   const timeInMeeting = leaveTime - joinTime;
  //   setTimeSpent(timeInMeeting);
  //   setTotalSessionTime((prevTotal) => prevTotal + timeInMeeting);
  //   console.log(
  //     `Participant ${participant.id} spent ${timeInMeeting} milliseconds in the meeting.`
  //   );

  //   // Update session details when the last participant leaves
  //   if (Object.keys(joinedParticipants).length === 1) {
  //     updateSessionDetails(leaveTime);
  //   }
  // };

  // const updateSessionDetails = async (endTime) => {
  //   try {
  //     // Calculate session cost based on time spent or any other criteria
  //     const sessionCost = calculateSessionCost(timeSpent);

  //     // Make an HTTP request to create or update session details on the server
  //     const sessionData = {
  //       studentId: data.userId,
  //       teacherId: "teacherId123", // Replace with the actual teacher ID
  //       startTime: meetingStartTime,
  //       endTime,
  //       sessionStatus: "completed",
  //       sessionCost,
  //       sessionType: "videoCall",
  //       totalSessionTime: totalSessionTime / (1000 * 60), // Convert milliseconds to minutes
  //     };

  //     const response = await axios.post(
  //       `http://${backendDomain}:5000/api/session/createOrUpdateSession`,
  //       sessionData
  //     );

  //     console.log("Session details updated successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error updating session details:", error);
  //   }
  // };

  // const calculateSessionCost = (timeInMeeting) => {
  //   // Implement your logic to calculate session cost based on time spent or any other criteria
  //   // This is just a placeholder, replace it with your actual calculation
  //   return timeInMeeting * 0.001; // Assuming timeInMeeting is in milliseconds
  // };

  const meetLink = `https://${domain}/${roomName}`;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <JitsiMeeting
        domain={domain}
        roomName={roomName}
        configOverwrite={configOverwrite}
        interfaceConfigOverwrite={interfaceConfigOverwrite}
        userInfo={userInfo}
        onApiReady={handleApiReady}
        getIFrameRef={handleIFrameRef}
      />
    </div>
  );
}

export default VideoCallPage;
