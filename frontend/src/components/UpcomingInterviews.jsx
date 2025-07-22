import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { INTERVIEW_API_END_POINT } from '@/utils/constant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, Loader2, AlertTriangle } from 'lucide-react';

const UpcomingInterviews = ({ userId }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get(`${INTERVIEW_API_END_POINT}/${userId}`, { withCredentials: true });
        let data = Array.isArray(res.data) ? res.data : (Array.isArray(res.data.interviews) ? res.data.interviews : []);
        // Only show interviews in the future (or within a grace period)
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


  if (loading) {
    return (
        <div className="flex items-center justify-center h-40">
            <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
    );
  }

  if (!Array.isArray(interviews) || interviews.length === 0) {
    return (
        <Card className="w-full max-w-4xl mx-auto my-8">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8">
                    <AlertTriangle className="mx-auto text-gray-400" size={40}/>
                    <p className="mt-4 text-gray-500">No upcoming interviews scheduled.</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 shadow-md border-gray-200">
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                {interviews.map((interview) => (
                    <div key={interview._id} className="p-4 border rounded-lg hover:shadow-lg transition-shadow bg-gray-50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div className="flex-1 mb-4 sm:mb-0">
                                <h3 className="text-lg font-semibold text-gray-900">{interview.jobId?.title || 'N/A'}</h3>
                                <p className="text-sm text-gray-600">{interview.companyId?.companyName || 'N/A'}</p>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-700 my-2 sm:my-0">
                                <div className="flex items-center space-x-2">
                                    <Calendar size={16} />
                                    <span>{new Date(interview.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock size={16} />
                                    <span>{new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-6">
                                <Link to={`/interview/room/${interview.videoRoomId}`}>
                                    <Button variant="solid" className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
                                        <Video size={16} className="mr-2"/>
                                        Join Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
  );
};

export default UpcomingInterviews;
