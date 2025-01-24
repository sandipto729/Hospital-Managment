import React, { useEffect, useRef } from 'react';

const JitsiMeet = () => {
    const jitsiContainerRef = useRef(null);

    useEffect(() => {
        const domain = "meet.jit.si";
        const options = {
            roomName: "med-manage", 
            parentNode: jitsiContainerRef.current,
            userInfo: {
                displayName: "Sandipto Roy", 
            },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);

        api.addEventListener("videoConferenceJoined", () => {
            console.log("Joined the meeting!");
        });

        return () => api.dispose();
    }, []);

    return <div style={{ height: "700px", width: "100%" }} ref={jitsiContainerRef}></div>;
};

export default JitsiMeet;
