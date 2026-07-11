import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function LatestJobs() {
    const { allJobs } = useSelector(store => store.job)
    const navigate = useNavigate();

    return (
        <section style={{
            backgroundColor: '#0F172A',
            padding: '64px 24px',
            borderBottom: '1px solid #1E293B',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <h2 style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#F8FAFC',
                            letterSpacing: '-0.02em',
                            margin: 0,
                        }}>
                            Latest Openings
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '14px', marginTop: '6px', marginBottom: 0 }}>
                            Fresh opportunities posted this week
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/jobs')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid #334155',
                            backgroundColor: 'transparent',
                            color: '#94A3B8',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            fontFamily: 'Inter, sans-serif',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.color = '#F8FAFC'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94A3B8'; }}
                    >
                        View all jobs <ArrowRight size={14} />
                    </button>
                </div>

                {allJobs.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 0',
                        color: '#475569',
                        fontSize: '15px',
                    }}>
                        No jobs available at the moment. Check back soon!
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '16px',
                    }}>
                        {allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default LatestJobs
