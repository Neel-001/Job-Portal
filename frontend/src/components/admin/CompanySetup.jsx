import React, { useEffect, useState } from 'react'
import CompanySetupSkeleton from './CompanySetupSkeleton'
import Navbar from '../shared/Navbar'
import { Loader2, ArrowLeft, Upload } from 'lucide-react'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useCompanyById from '@/hooks/useCompanyById'

function CompanySetup() {
    const params = useParams()
    useCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    })
    const { singleCompany } = useSelector((store) => store.company)
    const [loading, setLoading] = useState(true)
    const [logoPreview, setLogoPreview] = useState(null);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
        if (file) setLogoPreview(URL.createObjectURL(file));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        if (input.name.trim()) formData.append('name', input.name);
        if (input.description.trim()) formData.append('description', input.description);
        if (input.website.trim()) formData.append('website', input.website);
        if (input.location.trim()) formData.append('location', input.location);
        if (input.file) formData.append('file', input.file);

        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true)
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null,
        })
        if (singleCompany?.name) setLoading(false)
    }, [singleCompany])

    if (loading) return <CompanySetupSkeleton />;

    const inputStyle = {
        width: '100%',
        backgroundColor: '#0F172A',
        border: '1px solid #334155',
        borderRadius: '8px',
        color: '#F8FAFC',
        padding: '10px 14px',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    };

    const fields = [
        { label: 'Company Name', name: 'name', type: 'text', placeholder: 'e.g. Microsoft Corp.' },
        { label: 'Description', name: 'description', type: 'text', placeholder: 'Brief company description' },
        { label: 'Website', name: 'website', type: 'text', placeholder: 'https://company.com' },
        { label: 'Location', name: 'location', type: 'text', placeholder: 'City, Country' },
    ];

    return (
        <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 24px' }}>
                <button
                    onClick={() => navigate("/admin/companies")}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748B', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', padding: '8px 0', fontFamily: 'Inter, sans-serif' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                >
                    <ArrowLeft size={16} /> Back to Companies
                </button>

                <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '32px' }}>
                    <h1 style={{ color: '#F8FAFC', fontSize: '20px', fontWeight: '700', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                        Company Setup
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 28px' }}>Update your company's public profile</p>

                    <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Logo upload */}
                        <div>
                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                                Company Logo
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    backgroundColor: '#0F172A',
                                    borderRadius: '10px',
                                    border: '1px solid #334155',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                }}>
                                    {(logoPreview || singleCompany?.logo) ? (
                                        <img src={logoPreview || singleCompany?.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    ) : (
                                        <Upload size={20} color="#475569" />
                                    )}
                                </div>
                                <label style={{
                                    flex: 1,
                                    padding: '10px 14px',
                                    backgroundColor: '#0F172A',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#64748B',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'block',
                                }}>
                                    {input.file?.name || 'Upload logo (PNG, JPG)'}
                                    <input type="file" accept="image/*" onChange={changeFileHandler} style={{ display: 'none' }} />
                                </label>
                            </div>
                        </div>

                        {/* Fields grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {fields.map(({ label, name, type, placeholder }) => (
                                <div key={name}>
                                    <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={input[name]}
                                        onChange={changeEventHandler}
                                        placeholder={placeholder}
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = '#2563EB'}
                                        onBlur={e => e.target.style.borderColor = '#334155'}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Submit */}
                        <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
                            <button
                                type="button"
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
                                type="submit"
                                disabled={loading}
                                style={{
                                    flex: 2,
                                    padding: '11px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: loading ? '#1e3a6e' : '#2563EB',
                                    color: loading ? '#64748B' : '#ffffff',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    fontFamily: 'Inter, sans-serif',
                                }}
                            >
                                {loading ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup
