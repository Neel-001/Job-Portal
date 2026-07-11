import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Briefcase } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminJobsTable() {
    const { allAdminJobs } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const { searchJobByText } = useSelector(store => store.job)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (job?.title && job.title.toLowerCase().includes(searchJobByText.toLowerCase())) ||
                (job?.company?.name && job.company.name.toLowerCase().includes(searchJobByText.toLowerCase()));
        })
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])

    if (filterJobs.length === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
                <div style={{ width: '52px', height: '52px', backgroundColor: '#0F172A', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={24} color="#334155" />
                </div>
                <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>No jobs posted yet</p>
            </div>
        );
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#111827' }}>
                        {['Company', 'Job Title', 'Posted Date', ''].map((header, idx) => (
                            <th key={idx} style={{
                                padding: '12px 20px',
                                textAlign: 'left',
                                color: '#64748B',
                                fontSize: '11px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                            }}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filterJobs.map((job) => (
                        <tr
                            key={job._id}
                            style={{ borderBottom: '1px solid #1E293B', transition: 'background-color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#111827'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <td style={{ padding: '14px 20px', color: '#94A3B8', fontSize: '13px' }}>
                                {job?.company?.name}
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                                <span style={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '500' }}>{job?.title}</span>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                                <span style={{ color: '#64748B', fontSize: '13px' }}>{job?.createdAt.split("T")[0]}</span>
                            </td>
                            <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button style={{
                                            backgroundColor: 'transparent',
                                            border: '1px solid #334155',
                                            borderRadius: '6px',
                                            width: '32px',
                                            height: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: '#64748B',
                                            marginLeft: 'auto',
                                        }}>
                                            <MoreHorizontal size={14} />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" style={{
                                        backgroundColor: '#1E293B',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        padding: '6px',
                                        width: '160px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                                    }}>
                                        <button
                                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 10px', borderRadius: '6px', border: 'none', backgroundColor: 'transparent', color: '#94A3B8', fontSize: '13px', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
                                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#F8FAFC'; }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }}
                                        >
                                            <Edit2 size={13} /> Edit Job
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 10px', borderRadius: '6px', border: 'none', backgroundColor: 'transparent', color: '#94A3B8', fontSize: '13px', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
                                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#F8FAFC'; }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }}
                                        >
                                            <Eye size={13} /> View Applicants
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminJobsTable
