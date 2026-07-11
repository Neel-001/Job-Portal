import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2, ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react'

function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match")
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long")
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/password/reset/${token}`, { password }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Invalid or expired token")
        } finally {
            setLoading(false)
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
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '16px',
                padding: '36px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            }}>
                <Link
                    to="/login"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#64748B',
                        fontSize: '14px',
                        textDecoration: 'none',
                        marginBottom: '24px',
                        transition: 'color 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                >
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'rgba(37,99,235,0.1)',
                        border: '1px solid rgba(37,99,235,0.25)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Lock size={22} color="#2563EB" />
                    </div>
                </div>

                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#F8FAFC', marginBottom: '8px', textAlign: 'center', letterSpacing: '-0.01em' }}>
                    Reset your password
                </h2>
                <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '28px', textAlign: 'center', lineHeight: '1.5' }}>
                    Enter a new, strong password below to secure your account.
                </p>

                <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Password */}
                    <div>
                        <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>
                            New Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Min. 6 characters"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                style={{ ...inputStyle, paddingRight: '44px' }}
                                onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; }}
                                onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.boxShadow = 'none'; }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#64748B',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label style={{ display: 'block', color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>
                            Confirm New Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Repeat new password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                style={{ ...inputStyle, paddingRight: '44px' }}
                                onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; }}
                                onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.boxShadow = 'none'; }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#64748B',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '11px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: loading ? '#1e3a6e' : '#2563EB',
                            color: loading ? '#64748B' : '#ffffff',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.15s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontFamily: 'Inter, sans-serif',
                        }}
                        onMouseEnter={e => { if (!loading) e.target.style.backgroundColor = '#1D4ED8'; }}
                        onMouseLeave={e => { if (!loading) e.target.style.backgroundColor = '#2563EB'; }}
                    >
                        {loading ? (
                            <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Resetting...</>
                        ) : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
