import React, { useEffect, useRef } from 'react';

const JitsiMeet = () => {
    const jitsiContainerRef = useRef(null);

    useEffect(() => {
        const domain = "meet.jit.si"; // You can use your self-hosted Jitsi server domain if available
        const options = {
            roomName: "Prescripto", 
            parentNode: jitsiContainerRef.current,
            userInfo: {
                displayName: "Sandipto Roy", 
            },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);

        // Optional: Add event listeners
        api.addEventListener("videoConferenceJoined", () => {
            console.log("Joined the meeting!");
        });

        return () => api.dispose(); // Clean up when component unmounts
    }, []);

    return <div style={{ height: "700px", width: "100%" }} ref={jitsiContainerRef}></div>;
};

export default JitsiMeet;
