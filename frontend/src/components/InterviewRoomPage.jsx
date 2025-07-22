import React from 'react';
import { useParams } from 'react-router-dom';
import VideoInterviewRoom from './VideoInterviewRoom';
import { useSelector } from 'react-redux';

const InterviewRoomPage = () => {
  const { videoRoomId } = useParams();
  const { user } = useSelector(store => store.auth);
  if (!user) return <div>Please login to join the interview.</div>;
  return <VideoInterviewRoom roomId={videoRoomId} userId={user._id} />;
};

export default InterviewRoomPage;
