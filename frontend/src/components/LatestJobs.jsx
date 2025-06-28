import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'



function LatestJobs() {
    const {allJobs} = useSelector(store => store.job)
    
    return (
        <div className="max-w-7xl mx-auto my-20 px-4 bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] rounded-3xl shadow-2xl border border-[#e0e7ff] p-10">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-[#232946] drop-shadow-lg"><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
                {
                    allJobs.length===0 ? <span className="text-gray-400">No Jobs Available</span> : allJobs.slice(0,6).map((job, idx) => <LatestJobCards key={job._id} job={job}  />)
                }
            </div>
        </div>
    )
}

export default LatestJobs
