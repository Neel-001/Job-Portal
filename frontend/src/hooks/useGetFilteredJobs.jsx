import { setAllJobs, setFilteredJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGetFilteredJobs() {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store => store.job)
    useEffect(()=>{
        const fetchAllJobs = async ()=>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{ withCredentials: true });
                if(res.data.success){
                    dispatch(setFilteredJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[searchedQuery])
}

export default useGetFilteredJobs
