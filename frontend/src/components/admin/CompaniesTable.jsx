import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CompaniesTable() {
    const companies = useSelector(store => store.company.companies) || [];
    const [filterCompany, setFilterCompany] = useState(companies)
    const { searchCompanyByText } = useSelector(store => store.company)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompanies = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompanies)
    }, [companies, searchCompanyByText])

    if (filterCompany.length === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
                <div style={{ width: '52px', height: '52px', backgroundColor: '#0F172A', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={24} color="#334155" />
                </div>
                <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>No companies registered yet</p>
            </div>
        );
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#111827' }}>
                        {['Logo', 'Company Name', 'Registered Date', ''].map((header, idx) => (
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
                    {filterCompany.map((company) => (
                        <tr
                            key={company._id}
                            style={{ borderBottom: '1px solid #1E293B', transition: 'background-color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#111827'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <td style={{ padding: '14px 20px' }}>
                                <div style={{ width: '40px', height: '40px', backgroundColor: '#0F172A', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar style={{ width: '32px', height: '32px' }}>
                                        <AvatarImage src={company.logo} style={{ objectFit: 'contain' }} />
                                        <AvatarFallback style={{ backgroundColor: '#334155', color: '#94A3B8', fontSize: '13px', fontWeight: '600' }}>
                                            {company.name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                                <span style={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '500' }}>{company.name}</span>
                            </td>
                            <td style={{ padding: '14px 20px' }}>
                                <span style={{ color: '#64748B', fontSize: '13px' }}>{company.createdAt.split("T")[0]}</span>
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
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                width: '100%',
                                                padding: '8px 10px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                                color: '#94A3B8',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                fontFamily: 'Inter, sans-serif',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = '#F8FAFC'; }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }}
                                        >
                                            <Edit2 size={13} /> Edit Company
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

export default CompaniesTable
