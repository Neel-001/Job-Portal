import React, { useState } from 'react';
import axios from 'axios';
import { INTERVIEW_API_END_POINT } from '@/utils/constant';
import { Loader2, X } from 'lucide-react';

const ScheduleInterviewModal = ({ applicantId, jobId, onClose, onScheduled }) => {
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    console.log('ScheduleInterviewModal props:', { applicantId, jobId });
  }, [applicantId, jobId]);

  const handleSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!applicantId || !jobId) {
      setError('Interview cannot be scheduled: missing applicant or job ID.');
      setLoading(false);
      return;
    }
    if (!date || String(date).trim() === '') {
      setError('Please select a date and time.');
      setLoading(false);
      return;
    }

    try {
      const videoRoomId = `${jobId}-${applicantId}-${Date.now()}`;
      const response = await axios.post(
        INTERVIEW_API_END_POINT,
        {
          applicantId,
          jobId,
          date,
          videoRoomId,
        },
        { withCredentials: true }
      );
      if (response.data && response.data.success === false && response.data.message) {
        setError(response.data.message);
      } else {
        onScheduled();
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError('Error: ' + err.message);
      } else {
        setError('Failed to schedule interview.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    }}>
      <form
        onSubmit={handleSchedule}
        style={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '28px',
          width: '100%',
          maxWidth: '400px',
          color: '#F8FAFC',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#F8FAFC'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
        >
          <X size={18} />
        </button>

        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px', color: '#F8FAFC' }}>
          Schedule Interview
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
            Interview Date & Time
          </label>
          <input
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#F8FAFC',
              padding: '10px 14px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = '#2563EB'}
            onBlur={e => e.target.style.borderColor = '#334155'}
            required
          />
        </div>

        {error && (
          <div style={{
            fontSize: '13px',
            color: '#F87171',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '6px',
            padding: '8px 12px',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: 'transparent',
              color: '#94A3B8',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: loading ? '#1e3a6e' : '#2563EB',
              color: loading ? '#64748B' : '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Inter, sans-serif',
              transition: 'background-color 0.15s',
            }}
          >
            {loading && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
            {loading ? 'Scheduling...' : 'Schedule'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleInterviewModal;
