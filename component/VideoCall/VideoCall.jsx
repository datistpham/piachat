import React, { useState } from "react"
import { Text } from "react-native";

const VideoCall= ()=> {
    const [videoCall, setVideoCall] = useState(true);
    const connectionData = {
        appId: '876409529950427fad65a64698594fc8',
        channel: 'test',
    };
    const rtcCallbacks = {
      EndCall: () => setVideoCall(false),
    };
    return videoCall ? (
        <></>
    ) : (
        <Text onPress={()=>setVideoCall(true)}>Start Call</Text>
    );
}

export default VideoCall