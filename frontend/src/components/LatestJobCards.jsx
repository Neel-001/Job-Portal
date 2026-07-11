import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, DollarSign, Clock } from 'lucide-react'

function LatestJobCards({ job }) {
    const navigate = useNavigate()

    const daysAgo = (() => {
        const createdAt = new Date(job?.createdAt)
        const timeDiff = new Date() - createdAt;
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    })();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,99,235,0.1)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div>
                <h3 style={{ color: '#F8FAFC', fontWeight: '700', fontSize: '16px', margin: '0 0 4px', lineHeight: '1.4' }}>
                    {job?.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <p style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '500', margin: 0 }}>{job?.company?.name}</p>
                    <span style={{ color: '#334155', fontSize: '13px' }}>·</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={11} color="#475569" />
                        <span style={{ color: '#475569', fontSize: '12px' }}>India</span>
                    </div>
                </div>
            </div>

            <p style={{
                color: '#64748B',
                fontSize: '13px',
                lineHeight: '1.5',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            }}>
                {job?.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{
                    backgroundColor: 'rgba(37,99,235,0.1)',
                    color: '#60A5FA',
                    border: '1px solid rgba(37,99,235,0.25)',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: '500',
                }}>
                    {job?.position} Positions
                </span>
                <span style={{
                    backgroundColor: '#334155',
                    color: '#94A3B8',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: '500',
                }}>
                    {job?.jobType}
                </span>
                <span style={{
                    backgroundColor: 'rgba(34,197,94,0.08)',
                    color: '#4ADE80',
                    border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: '500',
                }}>
                    {job?.salary} LPA
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <Clock size={11} color="#475569" />
                <span style={{ color: '#475569', fontSize: '12px' }}>{daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}</span>
            </div>
        </div>
    )
}

export default LatestJobCards
