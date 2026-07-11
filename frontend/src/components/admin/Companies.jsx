import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Search, Plus } from 'lucide-react'
import CompaniesTable from './CompaniesTable'
import CompaniesSkeleton from './CompaniesSkeleton'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    const navigate = useNavigate()
    useGetAllCompanies();
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input, dispatch])

    useEffect(() => {
        setLoading(true)
        const unsubscribe = setTimeout(() => setLoading(false), 0)
        return () => clearTimeout(unsubscribe)
    }, [])

    return (
        <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <h1 style={{ color: '#F8FAFC', fontSize: '24px', fontWeight: '700', margin: '0 0 4px', letterSpacing: '-0.01em' }}>Companies</h1>
                        <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>Manage your registered companies</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/companies/create")}
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
                        <Plus size={16} /> New Company
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
                        placeholder="Filter by company name..."
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
                <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
                    {loading ? <CompaniesSkeleton /> : <CompaniesTable />}
                </div>
            </div>
        </div>
    )
}

export default Companies
