import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import {motion} from 'framer-motion'


// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
function Jobs() {
    const {allJobs,searchedQuery} = useSelector(store => store.job)
    const [filterJobs,setFilterJobs] = useState(allJobs)

    useEffect(()=>{
        if(searchedQuery){
            const filteredJobs = allJobs.filter((job)=>{
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        }
        else{
            setFilterJobs(allJobs)
        }
    },[allJobs,searchedQuery])
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] pb-10">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4 w-full mb-8 md:mb-0">
                        <div className="bg-white/95 border border-[#e0e7ff] rounded-3xl shadow-2xl p-6 backdrop-blur-lg">
                            <FilterCard />
                        </div>
                    </div>
                    <div className="flex-1">
                        {filterJobs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <img src="/public/vite.svg" alt="No jobs" className="w-24 h-24 opacity-60 mb-4" />
                                <span className="text-xl font-semibold text-[#6A38C2]">No jobs found.</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filterJobs.map((job, idx) => (
                                    <motion.div key={job._id} className="transition-transform hover:-translate-y-2" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }}>
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
