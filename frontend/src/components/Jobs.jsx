import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import JobsSkeleton from './JobsSkeleton'
import { Briefcase, Search, X } from 'lucide-react'

function Jobs() {
    const { allJobs, searchedQuery, selectedFilters } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)
    const [localSearch, setLocalSearch] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        let tempJobs = [...allJobs];

        // 1. Filter by searchedQuery (search bar input from home/other pages redirect)
        if (searchedQuery) {
            tempJobs = tempJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            });
        }

        // 2. Filter by local search input on this page
        if (localSearch) {
            tempJobs = tempJobs.filter((job) => {
                return job.title.toLowerCase().includes(localSearch.toLowerCase()) ||
                    job.company?.name?.toLowerCase().includes(localSearch.toLowerCase()) ||
                    job.location.toLowerCase().includes(localSearch.toLowerCase()) ||
                    job.description.toLowerCase().includes(localSearch.toLowerCase())
            });
        }

        // 3. Filter by Location selection (OR condition within category)
        if (selectedFilters?.Location && selectedFilters.Location.length > 0) {
            tempJobs = tempJobs.filter((job) => {
                return selectedFilters.Location.some(loc => 
                    job.location.toLowerCase().includes(loc.toLowerCase())
                );
            });
        }

        // 4. Filter by Industry selection (OR condition within category)
        if (selectedFilters?.Industry && selectedFilters.Industry.length > 0) {
            tempJobs = tempJobs.filter((job) => {
                return selectedFilters.Industry.some(ind => 
                    job.title.toLowerCase().includes(ind.toLowerCase()) ||
                    job.description.toLowerCase().includes(ind.toLowerCase())
                );
            });
        }

        // 5. Filter by Salary selection (OR condition within category)
        if (selectedFilters?.Salary && selectedFilters.Salary.length > 0) {
            tempJobs = tempJobs.filter((job) => {
                return selectedFilters.Salary.some(salRange => {
                    const salaryNum = Number(job.salary);
                    if (salRange === "0-42k") return salaryNum <= 0.5;
                    if (salRange === "42-1lakh") return salaryNum > 0.5 && salaryNum <= 1.2;
                    if (salRange === "1lakh to 5 lakh") return salaryNum > 1.2 && salaryNum <= 6;
                    return true;
                });
            });
        }

        setFilterJobs(tempJobs)
        setLoading(false)
    }, [allJobs, searchedQuery, localSearch, selectedFilters])

    return (
        <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
                
                {/* Page header and search bar row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h1 style={{ color: '#F8FAFC', fontSize: '24px', fontWeight: '700', margin: '0 0 6px', letterSpacing: '-0.01em' }}>Browse Jobs</h1>
                        <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
                            {filterJobs.length} opportunities available
                        </p>
                    </div>

                    {/* Local search bar */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#1E293B',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        padding: '0 14px',
                        width: '100%',
                        maxWidth: '360px',
                        transition: 'border-color 0.2s',
                    }}
                        onFocus={e => e.currentTarget.style.borderColor = '#2563EB'}
                        onBlur={e => e.currentTarget.style.borderColor = '#334155'}
                    >
                        <Search size={16} color="#475569" style={{ flexShrink: 0 }} />
                        <input
                            type="text"
                            placeholder="Search by title, company, location..."
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
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
                        {localSearch && (
                            <button
                                onClick={() => setLocalSearch('')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#64748B',
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                    {/* Sidebar */}
                    <div style={{ width: '240px', flexShrink: 0 }} className="hidden md:block">
                        <FilterCard />
                    </div>

                    {/* Job Grid */}
                    <div style={{ flex: 1 }}>
                        {loading ? (
                            <JobsSkeleton />
                        ) : filterJobs.length === 0 ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '80px 0',
                                gap: '16px',
                            }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    backgroundColor: '#1E293B',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Briefcase size={28} color="#475569" />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ color: '#94A3B8', fontSize: '16px', fontWeight: '600', margin: '0 0 6px' }}>No jobs found</p>
                                    <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>Try adjusting your filters or search query</p>
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '16px',
                            }}>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
