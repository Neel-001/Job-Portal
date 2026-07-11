import React from 'react'
import { useSelector } from 'react-redux';
import { Briefcase, Building2, CalendarDays, ArrowUpRight } from 'lucide-react';

function AppliedJobTable() {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return { backgroundColor: 'rgba(34,197,94,0.1)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.25)' };
            case 'rejected':
                return { backgroundColor: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' };
            default:
                return { backgroundColor: 'rgba(245,158,11,0.1)', color: '#FCD34D', border: '1px solid rgba(245,158,11,0.25)' };
        }
    };

    if (allAppliedJobs.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Briefcase size={32} color="#334155" style={{ margin: '0 auto 12px' }} />
                <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>You haven't applied to any jobs yet.</p>
            </div>
        );
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #334155' }}>
                        {['Date Applied', 'Job Role', 'Company', 'Status'].map(header => (
                            <th key={header} style={{
                                padding: '10px 12px',
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
                    {allAppliedJobs.map((appliedJob) => (
                        <tr
                            key={appliedJob._id}
                            style={{ borderBottom: '1px solid #1E293B', transition: 'background-color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#111827'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <td style={{ padding: '14px 12px', color: '#64748B', fontSize: '13px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CalendarDays size={13} color="#475569" />
                                    {appliedJob.createdAt.split("T")[0]}
                                </div>
                            </td>
                            <td style={{ padding: '14px 12px', color: '#F8FAFC', fontSize: '13px', fontWeight: '500' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Briefcase size={13} color="#2563EB" />
                                    {appliedJob?.job?.title}
                                </div>
                            </td>
                            <td style={{ padding: '14px 12px', color: '#94A3B8', fontSize: '13px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Building2 size={13} color="#475569" />
                                    {appliedJob?.job?.company?.name}
                                </div>
                            </td>
                            <td style={{ padding: '14px 12px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    borderRadius: '6px',
                                    padding: '3px 10px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    textTransform: 'capitalize',
                                    ...getStatusStyle(appliedJob?.status),
                                }}>
                                    {appliedJob?.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable
