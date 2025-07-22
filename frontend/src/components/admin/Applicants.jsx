import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

function Applicants() {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector((store) => store.application)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchAllApplicants = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true })
        dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllApplicants()
  }, [params.id, dispatch])
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] pb-10 flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto my-12 p-10 bg-white/95 border border-[#e0e7ff] rounded-3xl shadow-2xl backdrop-blur-lg">
        <h1 className="font-black text-3xl md:text-4xl text-[#232946] mb-8 text-center drop-shadow-lg tracking-tight">Applicants <span className="text-[#F83002]">({applicants?.applications?.length || 0})</span></h1>
        <div className="mt-8">
          <ApplicantsTable loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default Applicants
