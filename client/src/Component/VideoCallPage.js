import React, { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import axios from "axios";

function VideoCallPage({ data }) {
  const domain = "meet.jit.si";
  const [roomName, setRoomName] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState(null);
  const [timer, setTimer] = useState("");
  let timerElement = document.querySelector(".css-h6c4xs-timer");

  const handleApiReady = (externalApi) => {
    externalApi.addEventListener("videoConferenceJoined", () => {
      console.log("Joined the conference.");
      if (!meetingStartTime) {
        setMeetingStartTime(new Date());
      }
    });

    externalApi.addEventListener("videoConferenceLeft", () => {
      console.log("Left the conference.");
      notifyServerMeetingEnd();
    });
  };

  const notifyServerMeetingEnd = () => {
    // Notify the server that the meeting has ended
    axios
      .post("http://localhost:5000/api/service/meeting/end", {
        duration: calculateMeetingDuration(),
      })
      .then(() => console.log("Server notified"))
      .catch((error) => console.error("Error notifying server:", error));
  };

  const calculateMeetingDuration = () => {
    if (meetingStartTime) {
      const meetingEndTime = new Date();
      const meetingDuration = meetingEndTime - meetingStartTime;
      console.log(meetingDuration);
      return meetingDuration;
    }
    return 0; // Return 0 if the meeting start time is not set (possibly not joined)
  };

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
