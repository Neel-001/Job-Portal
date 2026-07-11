import React from 'react'
import { MapPin, DollarSign, Briefcase, Clock, Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

function Job({ job }) {
    const navigate = useNavigate();

    const daysagoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    }

    const daysAgo = daysagoFunction(job?.createdAt);

    return (
        <div
            style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '16px',
                padding: '24px',
                transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                height: '100%',
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
            {/* Header: company + bookmark + date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: '#0F172A',
                        border: '1px solid #334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}>
                        <Avatar style={{ width: '36px', height: '36px' }}>
                            <AvatarImage src={job?.company?.logo} style={{ objectFit: 'contain' }} />
                            <AvatarFallback style={{ backgroundColor: '#334155', color: '#94A3B8', fontSize: '14px', fontWeight: '600' }}>
                                {job?.company?.name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <p style={{ color: '#F8FAFC', fontWeight: '600', fontSize: '14px', margin: 0 }}>{job?.company?.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <MapPin size={12} color="#475569" />
                            <span style={{ color: '#475569', fontSize: '12px' }}>India</span>
                        </div>
                    </div>
                </div>
                <button
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s, color 0.15s',
                        color: '#64748B',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#2563EB'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#64748B'; }}
                >
                    <Bookmark size={14} />
                </button>
            </div>

            {/* Job Title & Description */}
            <div>
                <h3 style={{
                    color: '#F8FAFC',
                    fontWeight: '700',
                    fontSize: '16px',
                    margin: '0 0 6px',
                    lineHeight: '1.4',
                }}>
                    {job?.title}
                </h3>
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
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{
                    backgroundColor: 'rgba(37,99,235,0.1)',
                    color: '#60A5FA',
                    border: '1px solid rgba(37,99,235,0.25)',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: '500',
                }}>
                    {job?.position} {job?.position === 1 ? 'Position' : 'Positions'}
                </span>
                <span style={{
                    backgroundColor: '#334155',
                    color: '#94A3B8',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: '500',
                }}>
                    {job?.jobType}
                </span>
                <span style={{
                    backgroundColor: 'rgba(34,197,94,0.08)',
                    color: '#4ADE80',
                    border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    <DollarSign size={11} />
                    {job?.salary} LPA
                </span>
            </div>

            {/* Footer */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid #1E293B',
                marginTop: 'auto',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} color="#475569" />
                    <span style={{ color: '#475569', fontSize: '12px' }}>
                        {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
                    </span>
                </div>
                <button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    style={{
                        padding: '7px 16px',
                        borderRadius: '7px',
                        border: '1px solid #334155',
                        backgroundColor: 'transparent',
                        color: '#94A3B8',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2563EB'; e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94A3B8'; }}
                >
                    View Details
                </button>
            </div>
        </div>
    )
}

export default Job
