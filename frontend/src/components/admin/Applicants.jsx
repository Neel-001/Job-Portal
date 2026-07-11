import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { ArrowLeft } from 'lucide-react'

function Applicants() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Back */}
        <button
          onClick={() => navigate('/admin/jobs')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '24px',
            padding: '8px 0',
            fontFamily: 'Inter, sans-serif'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
        >
          <ArrowLeft size={16} /> Back to Jobs
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ color: '#F8FAFC', fontSize: '24px', fontWeight: '700', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
            Job Applicants
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
            {applicants?.applications?.length || 0} candidate(s) applied for this role
          </p>
        </div>

        {/* Table Container */}
        <div style={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <ApplicantsTable loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default Applicants
