import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2, Eye, EyeOff, Briefcase, CheckCircle2, Upload } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const BASE_BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || 'http://localhost:8000';

function Signup() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGoogleSignup = () => {
        window.location.href = `${BASE_BACKEND_URL}/api/v1/user/auth/google?role=${input.role || 'student'}`;
    };

    const inputStyle = {
        width: '100%',
        backgroundColor: '#0F172A',
        border: '1px solid #334155',
        borderRadius: '8px',
        color: '#F8FAFC',
        padding: '11px 14px',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
    };

    const benefits = [
        "Free to join — no subscription required",
        "AI-powered job matching technology",
        "Apply to jobs in one click",
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', display: 'flex' }}>
            {/* Left Panel — Brand */}
            <div
                className="hidden lg:flex"
                style={{
                    flex: 1,
                    backgroundColor: '#111827',
                    borderRight: '1px solid #1E293B',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '64px 48px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#2563EB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Briefcase size={22} color="#ffffff" />
                    </div>
                    <span style={{ fontSize: '22px', fontWeight: '700', color: '#F8FAFC', letterSpacing: '-0.02em' }}>
                        Talent<span style={{ color: '#2563EB' }}>Nest</span>
                    </span>
                </div>

                <h1 style={{ fontSize: '34px', fontWeight: '800', color: '#F8FAFC', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                    Join 500K+<br />professionals today.
                </h1>
                <p style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.6', marginBottom: '48px', maxWidth: '340px' }}>
                    Create your free account and discover opportunities tailored to your skills and ambitions.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {benefits.map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <CheckCircle2 size={18} color="#2563EB" />
                            <span style={{ color: '#94A3B8', fontSize: '14px' }}>{b}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '64px', padding: '20px 24px', backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '12px', maxWidth: '320px' }}>
                    <p style={{ color: '#64748B', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                        "TalentNest helped me land my dream job at a top tech company within 3 weeks."
                    </p>
                    <p style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '600', margin: '12px 0 0' }}>— Priya S., Software Engineer</p>
                </div>
            </div>

            {/* Right Panel — Form */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 24px',
                overflowY: 'auto',
            }}>
                <div style={{ width: '100%', maxWidth: '420px' }}>
                    {/* Mobile logo */}
                    <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: '#2563EB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Briefcase size={18} color="#ffffff" />
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#F8FAFC' }}>Talent<span style={{ color: '#2563EB' }}>Nest</span></span>
                    </div>

                    <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#F8FAFC', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                        Create your account
                    </h2>
                    <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '28px' }}>
                        Start your journey to your next great opportunity
                    </p>

                    <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Full Name */}
                        <div>
                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder="John Doe"
                                required
                                style={inputStyle}
                                onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; }}
                                onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="you@example.com"
                                required
                                style={inputStyle}
                                onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; }}
                                onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder="+91 9999999999"
                                required
                                style={inputStyle}
                                onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; }}
                                onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="Create a strong password"
                                    required
                                    style={{ ...inputStyle, paddingRight: '44px' }}
                                    onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.boxShadow = 'none'; }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: 0, display: 'flex' }}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '10px' }}>I am a</label>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {['student', 'recruiter'].map(role => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setInput({ ...input, role })}
                                        style={{
                                            flex: 1,
                                            padding: '10px 16px',
                                            borderRadius: '8px',
                                            border: input.role === role ? '1px solid #2563EB' : '1px solid #334155',
                                            backgroundColor: input.role === role ? 'rgba(37,99,235,0.1)' : 'transparent',
                                            color: input.role === role ? '#60A5FA' : '#94A3B8',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            textTransform: 'capitalize',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        {role === 'student' ? '👤 Student' : '🏢 Recruiter'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Profile Photo */}
                        <div>
                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Profile Photo</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #334155', flexShrink: 0 }} />
                                ) : (
                                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#1E293B', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Upload size={16} color="#64748B" />
                                    </div>
                                )}
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
                                    textAlign: 'center',
                                }}>
                                    {input.file?.name || 'Choose photo'}
                                    <input type="file" accept="image/*" onChange={changeFileHandler} style={{ display: 'none' }} />
                                </label>
                            </div>
                        </div>

                        {/* Terms */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={e => setAgreedToTerms(e.target.checked)}
                                style={{ marginTop: '2px', accentColor: '#2563EB', width: '14px', height: '14px', flexShrink: 0 }}
                            />
                            <label htmlFor="terms" style={{ color: '#64748B', fontSize: '13px', lineHeight: '1.5', cursor: 'pointer' }}>
                                I agree to the{' '}
                                <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Privacy Policy</a>
                            </label>
                        </div>

                        {/* Create Account Button */}
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
                            {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Creating account...</> : 'Create Account'}
                        </button>

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#334155' }} />
                            <span style={{ color: '#475569', fontSize: '13px' }}>or</span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#334155' }} />
                        </div>

                        {/* Google Button */}
                        <button
                            type="button"
                            onClick={handleGoogleSignup}
                            style={{
                                width: '100%',
                                padding: '11px',
                                borderRadius: '8px',
                                border: '1px solid #334155',
                                backgroundColor: 'transparent',
                                color: '#F8FAFC',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'border-color 0.15s, background-color 0.15s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.backgroundColor = '#1E293B'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        {/* Login Link */}
                        <p style={{ textAlign: 'center', color: '#64748B', fontSize: '14px', margin: 0 }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
