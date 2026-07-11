import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

function CompanyCreate() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('')
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.company))
                toast.success(res.data.message)
                navigate(`/admin/companies/${res?.data?.company?._id}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    return (
        <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 24px' }}>
                {/* Back */}
                <button
                    onClick={() => navigate('/admin/companies')}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748B', fontSize: '14px', cursor: 'pointer', marginBottom: '32px', padding: '8px 0', fontFamily: 'Inter, sans-serif' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                >
                    <ArrowLeft size={16} /> Back to Companies
                </button>

                <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '40px' }}>
                    <h1 style={{ color: '#F8FAFC', fontSize: '22px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                        Register a Company
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.5', margin: '0 0 32px' }}>
                        What's your company called? You can update the details after registration.
                    </p>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                            Company Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Microsoft, Google, Amazon..."
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: '#0F172A',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: '#F8FAFC',
                                padding: '11px 16px',
                                fontSize: '15px',
                                fontFamily: 'Inter, sans-serif',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box',
                            }}
                            onFocus={e => e.target.style.borderColor = '#2563EB'}
                            onBlur={e => e.target.style.borderColor = '#334155'}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => navigate('/admin/companies')}
                            style={{
                                flex: 1,
                                padding: '11px',
                                borderRadius: '8px',
                                border: '1px solid #334155',
                                backgroundColor: 'transparent',
                                color: '#94A3B8',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={registerNewCompany}
                            disabled={!companyName.trim()}
                            style={{
                                flex: 1,
                                padding: '11px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: companyName.trim() ? '#2563EB' : '#1e3a6e',
                                color: companyName.trim() ? '#ffffff' : '#64748B',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: companyName.trim() ? 'pointer' : 'not-allowed',
                                fontFamily: 'Inter, sans-serif',
                                transition: 'background-color 0.15s',
                            }}
                            onMouseEnter={e => { if (companyName.trim()) e.currentTarget.style.backgroundColor = '#1D4ED8'; }}
                            onMouseLeave={e => { if (companyName.trim()) e.currentTarget.style.backgroundColor = '#2563EB'; }}
                        >
                            Continue →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
