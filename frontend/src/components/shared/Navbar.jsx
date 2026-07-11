import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useState } from 'react';
import { LogOut, User2, Menu, X, Briefcase, Building2, Home, Search } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logout failed')
        }
    }

    const isActive = (path) => location.pathname === path;

    const studentLinks = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/jobs', label: 'Jobs', icon: Briefcase },
        { to: '/browse', label: 'Browse', icon: Search },
    ];

    const recruiterLinks = [
        { to: '/admin/companies', label: 'Companies', icon: Building2 },
        { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    ];

    const navLinks = user?.role === 'recruiter' ? recruiterLinks : studentLinks;

    return (
        <header style={{
            backgroundColor: '#0F172A',
            borderBottom: '1px solid #1E293B',
            position: 'sticky',
            top: 0,
            zIndex: 50,
        }}>
            <nav style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 24px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#2563EB',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <Briefcase size={18} color="#ffffff" />
                    </div>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#F8FAFC',
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '-0.02em',
                    }}>
                        Talent<span style={{ color: '#2563EB' }}>Nest</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <ul style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                }} className="hidden md:flex">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                style={{
                                    display: 'block',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: isActive(to) ? '#F8FAFC' : '#94A3B8',
                                    backgroundColor: isActive(to) ? '#1E293B' : 'transparent',
                                    textDecoration: 'none',
                                    transition: 'color 0.15s, background-color 0.15s',
                                    fontFamily: 'Inter, sans-serif',
                                }}
                                onMouseEnter={e => {
                                    if (!isActive(to)) {
                                        e.target.style.color = '#F8FAFC';
                                        e.target.style.backgroundColor = '#1E293B';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive(to)) {
                                        e.target.style.color = '#94A3B8';
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {!user ? (
                        <div className="hidden md:flex" style={{ gap: '8px', display: 'flex', alignItems: 'center' }}>
                            <Link to="/login">
                                <button style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #334155',
                                    backgroundColor: 'transparent',
                                    color: '#F8FAFC',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.15s, background-color 0.15s',
                                    fontFamily: 'Inter, sans-serif',
                                }}
                                    onMouseEnter={e => { e.target.style.borderColor = '#475569'; e.target.style.backgroundColor = '#1E293B'; }}
                                    onMouseLeave={e => { e.target.style.borderColor = '#334155'; e.target.style.backgroundColor = 'transparent'; }}
                                >
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button style={{
                                    padding: '8px 16px',
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
                                    onMouseEnter={e => e.target.style.backgroundColor = '#1D4ED8'}
                                    onMouseLeave={e => e.target.style.backgroundColor = '#2563EB'}
                                >
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '2px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <Avatar style={{ width: '36px', height: '36px', ring: '2px solid #334155' }}>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback style={{
                                            backgroundColor: '#2563EB',
                                            color: '#ffffff',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        }}>
                                            {user?.fullname?.[0]?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="end"
                                sideOffset={8}
                                style={{
                                    width: '240px',
                                    backgroundColor: '#1E293B',
                                    border: '1px solid #334155',
                                    borderRadius: '12px',
                                    padding: '8px',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                    zIndex: 100,
                                }}
                            >
                                {/* User info */}
                                <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid #334155', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Avatar style={{ width: '40px', height: '40px' }}>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback style={{ backgroundColor: '#2563EB', color: '#fff', fontWeight: '600' }}>
                                                {user?.fullname?.[0]?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p style={{ color: '#F8FAFC', fontWeight: '600', fontSize: '14px', margin: 0 }}>{user?.fullname}</p>
                                            <p style={{ color: '#64748B', fontSize: '12px', margin: 0, marginTop: '2px' }}>{user?.email}</p>
                                        </div>
                                    </div>
                                    {user?.profile?.bio && (
                                        <p style={{ color: '#94A3B8', fontSize: '12px', margin: '8px 0 0', lineHeight: '1.5' }}>{user.profile.bio}</p>
                                    )}
                                </div>

                                {/* Role badge */}
                                <div style={{ padding: '4px 12px 8px', borderBottom: '1px solid #334155', marginBottom: '8px' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        backgroundColor: user?.role === 'recruiter' ? 'rgba(245,158,11,0.15)' : 'rgba(37,99,235,0.15)',
                                        color: user?.role === 'recruiter' ? '#FCD34D' : '#60A5FA',
                                        border: `1px solid ${user?.role === 'recruiter' ? 'rgba(245,158,11,0.3)' : 'rgba(37,99,235,0.3)'}`,
                                        borderRadius: '6px',
                                        padding: '2px 10px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        {user?.role}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    {user?.role === 'student' && (
                                        <Link
                                            to="/profile"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px 12px',
                                                borderRadius: '8px',
                                                color: '#F8FAFC',
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                transition: 'background-color 0.15s',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#334155'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <User2 size={16} color="#94A3B8" />
                                            View Profile
                                        </Link>
                                    )}
                                    <button
                                        onClick={logoutHandler}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '10px 12px',
                                            borderRadius: '8px',
                                            color: '#EF4444',
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            width: '100%',
                                            textAlign: 'left',
                                            transition: 'background-color 0.15s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: 'none',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            color: '#94A3B8',
                            cursor: 'pointer',
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div style={{
                    backgroundColor: '#111827',
                    borderTop: '1px solid #1E293B',
                    padding: '16px 24px',
                }}>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: 'block',
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: isActive(to) ? '#F8FAFC' : '#94A3B8',
                                        backgroundColor: isActive(to) ? '#1E293B' : 'transparent',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                        {!user && (
                            <>
                                <li style={{ marginTop: '8px' }}>
                                    <Link to="/login" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', color: '#94A3B8', textDecoration: 'none' }}>Sign In</Link>
                                </li>
                                <li>
                                    <Link to="/signup" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#ffffff', backgroundColor: '#2563EB', textDecoration: 'none', textAlign: 'center', marginTop: '4px' }}>Get Started</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </header>
    )
}

export default Navbar;