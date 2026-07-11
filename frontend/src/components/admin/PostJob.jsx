import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

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
        { label: 'Job Title', name: 'title', type: 'text', placeholder: 'e.g. Senior React Developer' },
        { label: 'Description', name: 'description', type: 'text', placeholder: 'Brief job description' },
        { label: 'Requirements', name: 'requirements', type: 'text', placeholder: 'e.g. React, Node.js, 3+ years' },
        { label: 'Salary (LPA)', name: 'salary', type: 'text', placeholder: 'e.g. 12' },
        { label: 'Location', name: 'location', type: 'text', placeholder: 'e.g. Bangalore, Mumbai' },
        { label: 'Job Type', name: 'jobType', type: 'text', placeholder: 'e.g. Full-time, Remote' },
        { label: 'Experience (years)', name: 'experience', type: 'text', placeholder: 'e.g. 3' },
        { label: 'No. of Positions', name: 'position', type: 'number', placeholder: 'e.g. 2' },
    ];

    return (
        <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
                <button
                    onClick={() => navigate('/admin/jobs')}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748B', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', padding: '8px 0', fontFamily: 'Inter, sans-serif' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                >
                    <ArrowLeft size={16} /> Back to Jobs
                </button>

                <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '40px' }}>
                    <h1 style={{ color: '#F8FAFC', fontSize: '22px', fontWeight: '700', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                        Post a New Job
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 32px' }}>
                        Fill in the details to create a new job listing
                    </p>

                    <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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

                            {/* Company Select */}
                            {companies.length > 0 && (
                                <div>
                                    <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>
                                        Select Company
                                    </label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger style={{
                                            backgroundColor: '#0F172A',
                                            border: '1px solid #334155',
                                            borderRadius: '8px',
                                            color: '#F8FAFC',
                                            fontSize: '14px',
                                            height: '42px',
                                        }}>
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()} style={{ color: '#F8FAFC' }}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {companies.length === 0 && (
                            <div style={{
                                padding: '14px 16px',
                                backgroundColor: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.25)',
                                borderRadius: '8px',
                                color: '#F87171',
                                fontSize: '13px',
                            }}>
                                ⚠️ Please register a company first before posting a job.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: loading ? '#1e3a6e' : '#2563EB',
                                color: loading ? '#64748B' : '#ffffff',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.15s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#1D4ED8'; }}
                            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2563EB'; }}
                        >
                            {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Posting...</> : 'Post Job'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob