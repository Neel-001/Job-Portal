import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Search, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import AdminInterviews from './AdminInterviews'
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
        <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <h1 style={{ color: '#F8FAFC', fontSize: '24px', fontWeight: '700', margin: '0 0 4px', letterSpacing: '-0.01em' }}>Job Postings</h1>
                        <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>Manage and track your posted jobs</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/jobs/create")}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '9px 18px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#2563EB',
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s',
                            fontFamily: 'Inter, sans-serif',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                    >
                        <Plus size={16} /> Post New Job
                    </button>
                </div>

                {/* Search */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '0 14px',
                    maxWidth: '360px',
                    marginBottom: '24px',
                }}>
                    <Search size={16} color="#475569" />
                    <input
                        type="text"
                        placeholder="Filter by job title or company..."
                        onChange={e => setInput(e.target.value)}
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#F8FAFC',
                            fontSize: '14px',
                            padding: '10px 12px',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    />
                </div>

                {/* Table */}
                <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
                    <AdminJobsTable />
                </div>

                {/* Admin Interviews */}
                {user && user.role === 'recruiter' && (
                    <AdminInterviews adminId={user._id} />
                )}
            </div>
        </div>
    );
}

export default AdminJobs
