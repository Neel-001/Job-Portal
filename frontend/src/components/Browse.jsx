import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector, useDispatch } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetFilteredJobs from '@/hooks/useGetFilteredJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Search, Briefcase } from 'lucide-react';

function Browse() {
    useGetFilteredJobs();
    const { filteredJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        dispatch(setSearchedQuery(e.target.value));
    };

    return (
        <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
                {/* Search */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#111827',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    padding: '6px 6px 6px 20px',
                    maxWidth: '600px',
                    margin: '0 auto 40px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}>
                    <Search size={18} color="#475569" style={{ flexShrink: 0, marginRight: '8px' }} />
                    <input
                        type="text"
                        placeholder="Search by role, company, or location..."
                        value={query}
                        onChange={handleInputChange}
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#F8FAFC',
                            fontSize: '15px',
                            padding: '8px 0',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    />
                </div>

                {/* Results header */}
                <div style={{ marginBottom: '20px' }}>
                    <h1 style={{ color: '#F8FAFC', fontSize: '22px', fontWeight: '700', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                        Search Results
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                        {query && <span style={{ color: '#94A3B8' }}> for "<strong>{query}</strong>"</span>}
                    </p>
                </div>

                {/* Job Grid */}
                {filteredJobs.length === 0 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '80px 0',
                        gap: '16px',
                    }}>
                        <div style={{ width: '64px', height: '64px', backgroundColor: '#1E293B', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Briefcase size={28} color="#475569" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ color: '#94A3B8', fontSize: '16px', fontWeight: '600', margin: '0 0 6px' }}>No results found</p>
                            <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>Try a different search term</p>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '16px',
                    }}>
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse
