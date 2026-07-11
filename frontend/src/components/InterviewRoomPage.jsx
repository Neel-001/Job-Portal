import React from 'react';
import { useParams, Link } from 'react-router-dom';
import VideoInterviewRoom from './VideoInterviewRoom';
import { useSelector } from 'react-redux';

const InterviewRoomPage = () => {
  const { videoRoomId } = useParams();
  const { user } = useSelector(store => store.auth);

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#F8FAFC',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center', backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#F8FAFC' }}>
            Authentication Required
          </h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
            Please sign in to your account to join the scheduled video interview room.
          </p>
          <Link
            to="/login"
            style={{
              display: 'inline-block',
              width: '100%',
              padding: '10px',
              backgroundColor: '#2563EB',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '14px',
              textAlign: 'center',
              boxSizing: 'border-box',
              transition: 'background-color 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1D4ED8'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563EB'}
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return <VideoInterviewRoom roomId={videoRoomId} userId={user._id} />;
};

export default InterviewRoomPage;
