import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { INTERVIEW_API_END_POINT } from '@/utils/constant';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, Loader2, CalendarX } from 'lucide-react';

const UpcomingInterviews = ({ userId }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get(`${INTERVIEW_API_END_POINT}/${userId}`, { withCredentials: true });
        let data = Array.isArray(res.data) ? res.data : (Array.isArray(res.data.interviews) ? res.data.interviews : []);
        const now = new Date();
        data = data.filter(iv => new Date(iv.date) > now && iv.status === 'Scheduled');
        setInterviews(data);
      } catch (err) {
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, [userId]);

  return (
    <div style={{
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      borderRadius: '16px',
      padding: '24px',
    }}>
      <h2 style={{ color: '#F8FAFC', fontSize: '16px', fontWeight: '600', margin: '0 0 20px' }}>
        Upcoming Interviews
      </h2>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
          <Loader2 size={24} color="#2563EB" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      ) : interviews.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', gap: '12px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#0F172A', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarX size={22} color="#334155" />
          </div>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0, textAlign: 'center' }}>
            No upcoming interviews scheduled.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {interviews.map((interview) => (
            <div
              key={interview._id}
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
                  {interview.jobId?.title || 'Interview'}
                </h3>
                <p style={{ color: '#64748B', fontSize: '13px', margin: 0 }}>
                  {interview.jobId?.company?.name || 'Company'}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '13px' }}>
                  <Calendar size={14} color="#475569" />
                  {new Date(interview.date).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '13px' }}>
                  <Clock size={14} color="#475569" />
                  {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <Link to={`/interview/room/${interview.videoRoomId}`}>
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
                    <Video size={14} /> Join Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingInterviews;
