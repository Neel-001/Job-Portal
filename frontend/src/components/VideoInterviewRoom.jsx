import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ScreenShare } from 'lucide-react';

const SIGNAL_SERVER_URL = 'https://jobportal-signaling-server.onrender.com'; // Change to your production URL

const VideoInterviewRoom = ({ roomId, userId }) => {
  const [connecting, setConnecting] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [remoteCameraOn, setRemoteCameraOn] = useState(true); // Boolean for the other user
  const [micOn, setMicOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  // Debug overlay states
  const [debug, setDebug] = useState({
    socketConnected: false,
    getUserMedia: 'pending',
    peerState: 'new',
    remoteStream: false,
    lastSignal: '',
    error: ''
  });
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pcRef = useRef();
  const socketRef = useRef();
  const localStreamRef = useRef();

  // Track if remote user was ever present
  const remoteUserPresent = useRef(false);
  // Handshake state refs (must be at top level, not inside useEffect)
  const remoteReady = useRef(false);
  const localReady = useRef(false);
  const offerSent = useRef(false);

  useEffect(() => {
    console.log('VideoInterviewRoom mounted. roomId:', roomId, 'userId:', userId);
    let joinedRoom = false;
    let gotMediaSuccess = false;
    let announcedReady = false;
    const announceReadyIfPossible = () => {
      if (joinedRoom && gotMediaSuccess && !announcedReady) {
        announcedReady = true;
        socketRef.current.emit('ready', roomId);
        localReady.current = true;
        sendOfferIfReady();
      }
    };
    try {
      socketRef.current = io(SIGNAL_SERVER_URL, {
        transports: ['websocket'],
        withCredentials: false,
        reconnectionAttempts: 5,
        timeout: 2000
      });
      socketRef.current.on('connect', () => {
        setDebug(d => ({ ...d, socketConnected: true }));
        console.log('Socket connected:', socketRef.current.connected);
        socketRef.current.emit('join', roomId);
        joinedRoom = true;
        announceReadyIfPossible();
      });
      socketRef.current.on('connect_error', (err) => {
        setDebug(d => ({ ...d, socketConnected: false, error: 'Socket connection error' }));
        console.error('Socket connection error:', err);
      });
    } catch (err) {
      setDebug(d => ({ ...d, socketConnected: false, error: 'Socket connection error (outer)' }));
      console.error('Socket connection error (outer):', err);
    }

    // Create RTCPeerConnection immediately
    pcRef.current = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    setDebug(d => ({ ...d, peerState: pcRef.current.signalingState }));

    // Move event handlers inside here
    pcRef.current.onicecandidate = (event) => {
      setDebug(d => ({ ...d, peerState: pcRef.current.signalingState }));
      if (event.candidate) {
        console.log('Sending ICE candidate');
        socketRef.current.emit('signal', { roomId, data: { candidate: event.candidate } });
      }
    };

    pcRef.current.ontrack = (event) => {
      if (event.streams && event.streams[0] && event.streams[0].getTracks().length > 0) {
        remoteVideoRef.current.srcObject = event.streams[0];
        remoteUserPresent.current = true;
        setDebug(d => ({ ...d, remoteStream: true }));
        console.log('Remote user present: true');
      } else {
        setDebug(d => ({ ...d, remoteStream: false }));
        console.log('ontrack fired but no real remote stream');
      }
    };

    // Get media after video element is mounted
    // Use a flag to avoid double-calling
    let gotMedia = false;
    const getMedia = async () => {
      if (gotMedia) return;
      gotMedia = true;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setDebug(d => ({ ...d, getUserMedia: 'success' }));
        console.log('getUserMedia success');
        localStreamRef.current = stream;
        setConnecting(false);
        gotMediaSuccess = true;
        announceReadyIfPossible();
      } catch (err) {
        setDebug(d => ({ ...d, getUserMedia: 'error', error: 'getUserMedia error' }));
        console.error('getUserMedia error:', err);
        setConnecting(false);
      }
    };
    // Wait for video element to mount, then set srcObject and add tracks
    const waitForVideo = setInterval(() => {
      if (localVideoRef.current && localStreamRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
        if (pcRef.current && pcRef.current.signalingState !== 'closed') {
          // Only add tracks if not already added
          const senders = pcRef.current.getSenders();
          const tracks = localStreamRef.current.getTracks();
          tracks.forEach(track => {
            if (!senders.find(s => s.track === track)) {
              pcRef.current.addTrack(track, localStreamRef.current);
            }
          });
        }
        clearInterval(waitForVideo);
      }
    }, 50);
    getMedia();


    // Helper to send offer if possible
    const trySendOffer = async () => {
      if (
        pcRef.current &&
        pcRef.current.signalingState === 'stable' &&
        (!pcRef.current.remoteDescription || pcRef.current.remoteDescription.type === '')
      ) {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        socketRef.current.emit('signal', { roomId, data: { sdp: pcRef.current.localDescription } });
        setDebug(d => ({ ...d, lastSignal: 'Sent offer' }));
        console.log('Sent offer');
      }
    };


    // Ready handshake logic (useRef for persistence)
    const sendOfferIfReady = async () => {
      if (remoteReady.current && localReady.current && !offerSent.current) {
        offerSent.current = true;
        await trySendOffer();
      }
    };

    socketRef.current.on('user-joined', async () => {
      console.log('user-joined event received!');
      // Wait for ready handshake
    });

    socketRef.current.on('ready', () => {
      remoteReady.current = true;
      sendOfferIfReady();
    });

    // Listen for the other user's camera state
    socketRef.current.on('camera-toggle', ({ cameraOn: newCameraState }) => {
      setRemoteCameraOn(newCameraState);
    });

    // Remove old localReady setTimeout logic

    let gotOffer = false;
    socketRef.current.on('signal', async (payload) => {
      // Accept { id, data } from server
      const data = payload.data;
      setDebug(d => ({ ...d, lastSignal: JSON.stringify(data) }));
      console.log('signal event received!', data);
      if (data.sdp) {
        if (data.sdp.type === 'offer') {
          gotOffer = true;
          setDebug(d => ({ ...d, lastSignal: 'Received offer' }));
        }
        try {
          await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
        } catch (err) {
          setDebug(d => ({ ...d, error: 'setRemoteDescription error' }));
          console.error('setRemoteDescription error:', err);
        }
        if (data.sdp.type === 'offer') {
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          socketRef.current.emit('signal', { roomId, data: { sdp: pcRef.current.localDescription } });
          setDebug(d => ({ ...d, lastSignal: 'Sent answer' }));
        }
      }
      if (data.candidate) {
        try {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (e) {
          setDebug(d => ({ ...d, error: 'addIceCandidate error' }));
          console.error('addIceCandidate error:', e);
        }
      }
    });

    // Warn if no offer received after 3 seconds
    // setTimeout(() => {
    //   if (!gotOffer) {
    //     setDebug(d => ({ ...d, error: 'No offer received from remote user. Check signaling server.' }));
    //     console.warn('No offer received from remote user.');
    //   }
    // }, 3000);



    socketRef.current.on('user-left', () => {
      console.log('user-left event received!');
      // Only show call ended if remote user was ever present
      if (remoteUserPresent.current) {
        setCallEnded(true);
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      } else {
        // Ignore user-left if no remote ever joined
        console.log('user-left ignored: remote user was never present.');
      }
    });

    return () => {
      clearInterval(waitForVideo);
      if (socketRef.current) socketRef.current.disconnect();
      if (pcRef.current) pcRef.current.close();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomId]);

  const handleScreenShare = async () => {
    if (!screenSharing && pcRef.current) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setScreenSharing(true);
        const videoTrack = screenStream.getVideoTracks()[0];
        const sender = pcRef.current.getSenders().find(s => s.track && s.track.kind === 'video');
        if (sender) sender.replaceTrack(videoTrack);
        localVideoRef.current.srcObject = screenStream;
        videoTrack.onended = async () => {
          setScreenSharing(false);
          const camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          const camTrack = camStream.getVideoTracks()[0];
          if (sender) sender.replaceTrack(camTrack);
          localVideoRef.current.srcObject = camStream;
          localStreamRef.current = camStream;
        };
      } catch (err) {
        setScreenSharing(false);
      }
    }
  };

  const handleEndCall = () => {
    console.log('handleEndCall called!');
    // Notify the other participant
    if (socketRef.current) {
      socketRef.current.emit('leave', roomId);
      socketRef.current.disconnect();
    }
    if (pcRef.current) pcRef.current.close();
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setCallEnded(true);
    window.location.href = '/'; // Automatically navigate to home
  };

  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        // This just enables or disables the video track, it does not stop the camera hardware
        const newCameraState = !videoTrack.enabled;
        videoTrack.enabled = newCameraState;
        setCameraOn(newCameraState);

        // Send the boolean state to the other user
        if (socketRef.current) {
          socketRef.current.emit('camera-toggle', { roomId, cameraOn: newCameraState });
        }
      }
    }
  };

  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicOn(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Main Video Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Local Video */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden h-full flex items-center justify-center">
          <video ref={localVideoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
          {!cameraOn && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="h-16 w-16 text-gray-500" />
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-gray-900/50 px-2 py-1 rounded">
            <span className="text-sm font-semibold">You</span>
          </div>
        </div>

        {/* Remote Video */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden h-full flex items-center justify-center">
          <video ref={remoteVideoRef} autoPlay playsInline className="h-full w-full object-cover" />
          {!remoteCameraOn && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="h-16 w-16 text-gray-500" />
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-gray-900/50 px-2 py-1 rounded">
            <span className="text-sm font-semibold">Other</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4 flex items-center justify-center gap-4">
        <button onClick={toggleMic} className={`p-3 rounded-full ${micOn ? 'bg-blue-600' : 'bg-gray-700'}`} disabled={callEnded} title={micOn ? 'Mute Mic' : 'Unmute Mic'}>
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
        <button onClick={toggleCamera} className={`p-3 rounded-full ${cameraOn ? 'bg-blue-600' : 'bg-gray-700'}`} disabled={callEnded} title={cameraOn ? 'Turn Off Camera' : 'Turn On Camera'}>
          {cameraOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
        <button onClick={handleScreenShare} className={`p-3 rounded-full ${screenSharing ? 'bg-green-600' : 'bg-gray-700'}`} disabled={callEnded || screenSharing} title="Share Screen">
          <ScreenShare size={24} />
        </button>
        <button onClick={handleEndCall} className="p-3 rounded-full bg-red-600" disabled={callEnded} title="End Call">
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoInterviewRoom;
