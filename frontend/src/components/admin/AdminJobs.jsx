import React, { use, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import AdminInterviews from './AdminInterviews'
import { useSelector } from 'react-redux';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setsearchJobByText } from '@/redux/jobSlice'

function AdminJobs() {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] pb-10 flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto my-12 p-14 bg-white/95 border border-[#e0e7ff] rounded-3xl shadow-2xl backdrop-blur-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <Input
            className="w-full md:w-1/2 bg-[#f3f0fa] border-0 rounded-full px-6 py-3 text-lg font-semibold text-[#232946] placeholder:text-[#6A38C2]/60 shadow"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#F83002] hover:to-[#6A38C2] text-white font-bold px-8 py-3 shadow-lg transition" onClick={() => navigate("/admin/jobs/create")}>Post New Job</Button>
        </div>
        <div className="mt-8">
          <AdminJobsTable />
        </div>
        {/* Show scheduled interviews for this recruiter */}
        {user && user.role === 'recruiter' && (
          <div className="mt-12">
            <AdminInterviews adminId={user._id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminJobs
