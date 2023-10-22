import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import Timer from "./Timer";

function VideoCallPage() {
  const domain = "meet.jit.si"; // Change to your Jitsi server domain
  const roomName = "YourRoomName"; // Set your desired room name

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
    displayName: "YourUsername",
  };

  const handleApiReady = (externalApi) => {
    externalApi.addEventListener("videoConferenceJoined", () => {
      console.log("Joined the conference.");
    });
  };

  const handleIFrameRef = (iframeRef) => {
    if (iframeRef) {
      // Set the iframe to occupy the entire screen
      iframeRef.style.width = "100%";
      iframeRef.style.height = "100vh";
    }
  };

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
