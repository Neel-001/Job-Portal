import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
  const [isApplied, setisApplied] = useState(isInitiallyApplied);
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setisApplied(true);
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }


  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setisApplied(res.data.job.applications.some(application => application.applicant===user?._id))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id])
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] pb-10 flex flex-col">
      <div className="max-w-3xl mx-auto my-12 bg-white/95 border border-[#e0e7ff] rounded-3xl shadow-2xl p-10 backdrop-blur-lg">
        <h1 className="font-black text-3xl md:text-4xl text-[#232946] mb-6 text-center drop-shadow-lg tracking-tight">{singleJob?.title}</h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge className="bg-[#ece9f6] text-[#6A38C2] font-bold px-4 py-2 rounded-full text-base shadow" variant="ghost">{singleJob?.position} Positions</Badge>
            <Badge className="bg-[#f3f0fa] text-[#F83002] font-bold px-4 py-2 rounded-full text-base shadow" variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className="bg-[#e0e7ff] text-[#7209b7] font-bold px-4 py-2 rounded-full text-base shadow" variant="ghost">{singleJob?.salary} LPA</Badge>
          </div>
          <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-full px-8 py-3 text-lg font-bold shadow-lg transition ${isApplied ? 'bg-green-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#F83002] hover:to-[#6A38C2] text-white'}`}>{isApplied ? 'Applied' : 'Apply Now'}</Button>
        </div>
        <h2 className="border-b-2 border-b-[#ece9f6] font-bold text-xl text-[#232946] py-4 mb-4">Job Description</h2>
        <div className="my-4 space-y-2 text-[#232946]">
          <div><span className="font-bold">Role:</span> <span className="pl-2 font-normal">{singleJob?.title}</span></div>
          <div><span className="font-bold">Location:</span> <span className="pl-2 font-normal">{singleJob?.location}</span></div>
          <div><span className="font-bold">Description:</span> <span className="pl-2 font-normal">{singleJob?.description}</span></div>
          <div><span className="font-bold">Experience:</span> <span className="pl-2 font-normal">{singleJob?.experience} yrs</span></div>
          <div><span className="font-bold">Salary:</span> <span className="pl-2 font-normal">{singleJob?.salary} LPA</span></div>
          <div><span className="font-bold">Total Applicants:</span> <span className="pl-2 font-normal">{singleJob?.applications?.length}</span></div>
          <div><span className="font-bold">Posted Date:</span> <span className="pl-2 font-normal">{singleJob?.createdAt?.split("T")[0]}</span></div>
        </div>
      </div>
    </div>
  )
}

export default JobDescription
