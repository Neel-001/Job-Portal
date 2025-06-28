    import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector, useDispatch } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetFilteredJobs from '@/hooks/useGetFilteredJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Search } from 'lucide-react';
import { Button } from './ui/button';


// const randomJobs = [1, 2, 3,4,5,6,7,8]
function Browse() {
    useGetFilteredJobs();
    const { filteredJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const handleInputChange = (e) => {
        setQuery(e.target.value);
        dispatch(setSearchedQuery(e.target.value));
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] pb-10">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 mt-5'>
                <div className="flex w-full max-w-2xl shadow-2xl border border-[#e0e7ff] rounded-full bg-white/95 mx-auto backdrop-blur-lg mb-10">
                    <input
                        type="text"
                        placeholder="Search by role, company, location"
                        className="outline-none border-none w-full bg-transparent text-lg px-8 py-4 rounded-l-full text-[#232946] placeholder:text-[#6A38C2]/60 font-semibold"
                        value={query}
                        onChange={handleInputChange}
                    />
                </div>
                <h1 className='font-black text-3xl md:text-4xl text-[#232946] mb-10 text-center drop-shadow-lg'>
                    <span className='text-[#6A38C2]'>Search Results</span> <span className='text-[#F83002]'>({filteredJobs.length})</span>
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {
                        filteredJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse
