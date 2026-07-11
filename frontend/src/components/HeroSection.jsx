import { Search, TrendingUp, Users, Building2, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchJobHandler();
    }

    const stats = [
        { value: '50K+', label: 'Active Jobs', icon: TrendingUp },
        { value: '10K+', label: 'Companies', icon: Building2 },
        { value: '500K+', label: 'Candidates', icon: Users },
    ];

    const popularSearches = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UI/UX Designer', 'DevOps'];

    return (
        <section style={{
            backgroundColor: '#0F172A',
            padding: '80px 24px 64px',
            borderBottom: '1px solid #1E293B',
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                {/* Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(37,99,235,0.1)',
                    border: '1px solid rgba(37,99,235,0.25)',
                    borderRadius: '100px',
                    padding: '6px 14px',
                    marginBottom: '28px',
                }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#2563EB', borderRadius: '50%' }} />
                    <span style={{ color: '#60A5FA', fontSize: '13px', fontWeight: '500' }}>
                        Trusted by 500K+ professionals worldwide
                    </span>
                </div>

                {/* Headline */}
                <h1 style={{
                    fontSize: 'clamp(36px, 6vw, 60px)',
                    fontWeight: '800',
                    color: '#F8FAFC',
                    lineHeight: '1.15',
                    letterSpacing: '-0.03em',
                    marginBottom: '20px',
                }}>
                    Find Your Next
                    <br />
                    <span style={{ color: '#2563EB' }}>Dream Opportunity</span>
                </h1>

                <p style={{
                    color: '#64748B',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    maxWidth: '520px',
                    margin: '0 auto 40px',
                }}>
                    Connect with top companies, discover jobs that match your skills, and take the next step in your career.
                </p>

                {/* Search Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#111827',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    padding: '6px 6px 6px 20px',
                    maxWidth: '600px',
                    margin: '0 auto 24px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    transition: 'border-color 0.2s',
                }}
                    onFocus={() => { }}
                    onClick={() => { }}
                >
                    <Search size={20} color="#475569" style={{ flexShrink: 0, marginRight: '4px' }} />
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search by role, skill, or company..."
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#F8FAFC',
                            fontSize: '15px',
                            padding: '8px 12px',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    />
                    <button
                        onClick={searchJobHandler}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#2563EB',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            fontFamily: 'Inter, sans-serif',
                            transition: 'background-color 0.15s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563EB'}
                    >
                        Search Jobs
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Popular Searches */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '56px' }}>
                    <span style={{ color: '#475569', fontSize: '13px' }}>Popular:</span>
                    {popularSearches.map(term => (
                        <button
                            key={term}
                            onClick={() => { dispatch(setSearchedQuery(term)); navigate('/browse'); }}
                            style={{
                                padding: '4px 12px',
                                backgroundColor: 'transparent',
                                border: '1px solid #334155',
                                borderRadius: '100px',
                                color: '#94A3B8',
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.color = '#F8FAFC'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94A3B8'; }}
                        >
                            {term}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1px',
                    backgroundColor: '#1E293B',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #334155',
                }}>
                    {stats.map(({ value, label, icon: Icon }) => (
                        <div
                            key={label}
                            style={{
                                padding: '24px',
                                backgroundColor: '#111827',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <Icon size={20} color="#2563EB" />
                            <span style={{ fontSize: '28px', fontWeight: '800', color: '#F8FAFC', letterSpacing: '-0.02em' }}>{value}</span>
                            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection
