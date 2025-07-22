import React, { useState } from 'react';
import axios from 'axios';
import { INTERVIEW_API_END_POINT } from '@/utils/constant';

const ScheduleInterviewModal = ({ applicantId, jobId, onClose, onScheduled }) => {
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Debug: log the props to see if IDs are missing
  React.useEffect(() => {
    console.log('ScheduleInterviewModal props:', { applicantId, jobId });
  }, [applicantId, jobId]);

  const handleSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Input validation
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
      // Generate a unique videoRoomId (could be UUID or job+applicant)
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <form onSubmit={handleSchedule} className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-lg font-bold mb-4">Schedule Interview</h2>
        <label className="block mb-2">Interview Date & Time</label>
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          required
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? 'Scheduling...' : 'Schedule'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleInterviewModal;
