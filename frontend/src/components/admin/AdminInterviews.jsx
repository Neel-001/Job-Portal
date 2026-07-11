import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { INTERVIEW_API_END_POINT } from '@/utils/constant';
import { Calendar, Clock, Video, Loader2, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminInterviews = ({ adminId }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get(`${INTERVIEW_API_END_POINT}/admin/${adminId}`, { withCredentials: true });
        let data = Array.isArray(res.data) ? res.data : (Array.isArray(res.data.interviews) ? res.data.interviews : []);
        setInterviews(data);
      } catch (err) {
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, [adminId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
        <Loader2 size={24} color="#2563EB" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!Array.isArray(interviews) || interviews.length === 0) {
    return (
      <div style={{
        backgroundColor: '#1E293B',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        color: '#475569',
        fontSize: '14px',
      }}>
        No interviews scheduled yet.
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      borderRadius: '16px',
      padding: '24px',
      marginTop: '24px',
    }}>
      <h2 style={{ color: '#F8FAFC', fontSize: '16px', fontWeight: '600', margin: '0 0 20px' }}>
        Scheduled Interviews
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {interviews.map((iv) => (
          <div
            key={iv._id}
            style={{
              backgroundColor: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h3 style={{ color: '#F8FAFC', fontWeight: '600', fontSize: '14px', margin: '0 0 4px' }}>
                {iv.jobId?.title || 'N/A'}
              </h3>
              <p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 4px' }}>
                Candidate: <strong style={{ color: '#94A3B8' }}>{iv.applicantId?.fullname || 'N/A'}</strong>
              </p>
              {iv.feedback && (
                <p style={{ color: '#4ADE80', fontSize: '12px', margin: 0 }}>
                  Feedback: {iv.feedback}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '13px' }}>
                <Calendar size={14} color="#475569" />
                {new Date(iv.date).toLocaleDateString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '13px' }}>
                <Clock size={14} color="#475569" />
                {new Date(iv.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              
              {iv.status === 'Scheduled' ? (
                <a href={`/interview/room/${iv.videoRoomId}`} style={{ textDecoration: 'none' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 16px',
                    borderRadius: '7px',
                    border: 'none',
                    backgroundColor: '#2563EB',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'background-color 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                  >
                    <Video size={14} /> Join Room
                  </button>
                </a>
              ) : (
                <span style={{
                  backgroundColor: '#334155',
                  color: '#94A3B8',
                  borderRadius: '6px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  fontWeight: '500',
                }}>
                  {iv.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInterviews;
