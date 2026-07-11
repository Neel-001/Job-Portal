import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import JobDescriptionSkeleton from './JobDescriptionSkeleton'
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { MapPin, DollarSign, Briefcase, Users, Clock, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';

function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
  const [isApplied, setisApplied] = useState(isInitiallyApplied);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    dispatch(setSingleJob({}));
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setisApplied(res.data.job.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id])

  if (loading) {
    return <JobDescriptionSkeleton />;
  }

  const detailRows = [
    { label: 'Role', value: singleJob?.title, icon: Briefcase },
    { label: 'Location', value: singleJob?.location, icon: MapPin },
    { label: 'Experience', value: `${singleJob?.experience} yrs`, icon: Clock },
    { label: 'Salary', value: `${singleJob?.salary} LPA`, icon: DollarSign },
    { label: 'Total Applicants', value: singleJob?.applications?.length, icon: Users },
    { label: 'Posted Date', value: singleJob?.createdAt?.split("T")[0], icon: Calendar },
  ];

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 0',
            background: 'none',
            border: 'none',
            color: '#64748B',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '24px',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
        >
          <ArrowLeft size={16} /> Back to jobs
        </button>

        {/* Job header card */}
        <div style={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{
                color: '#F8FAFC',
                fontSize: '26px',
                fontWeight: '800',
                margin: '0 0 8px',
                letterSpacing: '-0.02em',
              }}>
                {singleJob?.title}
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '15px', margin: '0 0 16px' }}>
                {singleJob?.company?.name}
              </p>
              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{
                  backgroundColor: 'rgba(37,99,235,0.1)',
                  color: '#60A5FA',
                  border: '1px solid rgba(37,99,235,0.25)',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {singleJob?.position} Positions
                </span>
                <span style={{
                  backgroundColor: '#334155',
                  color: '#94A3B8',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {singleJob?.jobType}
                </span>
                <span style={{
                  backgroundColor: 'rgba(34,197,94,0.08)',
                  color: '#4ADE80',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {singleJob?.salary} LPA
                </span>
              </div>
            </div>

            {/* Apply button */}
            <button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isApplied ? '#1E3A5F' : '#2563EB',
                color: isApplied ? '#60A5FA' : '#ffffff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isApplied ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.15s',
                fontFamily: 'Inter, sans-serif',
                flexShrink: 0,
              }}
              onMouseEnter={e => { if (!isApplied) e.currentTarget.style.backgroundColor = '#1D4ED8'; }}
              onMouseLeave={e => { if (!isApplied) e.currentTarget.style.backgroundColor = '#2563EB'; }}
            >
              {isApplied ? <><CheckCircle2 size={16} /> Applied</> : 'Apply Now'}
            </button>
          </div>
        </div>

        {/* Job details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Description */}
          <div style={{
            gridColumn: '1 / -1',
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '28px',
          }}>
            <h2 style={{
              color: '#F8FAFC',
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 16px',
              paddingBottom: '12px',
              borderBottom: '1px solid #334155',
            }}>
              Job Description
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              {singleJob?.description}
            </p>
          </div>

          {/* Details grid */}
          {detailRows.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(37,99,235,0.1)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={18} color="#2563EB" />
              </div>
              <div>
                <p style={{ color: '#64748B', fontSize: '12px', fontWeight: '500', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                <p style={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '600', margin: 0 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobDescription
