import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { INTERVIEW_API_END_POINT } from '@/utils/constant';

const AdminInterviews = ({ adminId }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        // Fetch all interviews for jobs posted by this admin
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

  if (loading) return <div>Loading interviews...</div>;
  if (!Array.isArray(interviews) || interviews.length === 0) return <div>No scheduled interviews.</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Scheduled Interviews</h2>
      <ul>
        {interviews.map((iv) => (
          <li key={iv._id} className="mb-4 border-b pb-2">
            <div><b>Applicant:</b> {iv.applicantId?.fullname || 'N/A'}</div>
            <div><b>Job:</b> {iv.jobId?.title || 'N/A'}</div>
            <div><b>Date:</b> {new Date(iv.date).toLocaleString()}</div>
            <div><b>Status:</b> {iv.status}</div>
            {iv.status === 'Scheduled' && (
              <a href={`/interview/room/${iv.videoRoomId}`} className="text-blue-600 underline">Join</a>
            )}
            {iv.feedback && <div><b>Feedback:</b> {iv.feedback}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminInterviews;
