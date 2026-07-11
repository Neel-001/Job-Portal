import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function GoogleAuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
            toast.error(decodeURIComponent(error));
            navigate('/login');
            return;
        }

        if (userParam) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));
                dispatch(setUser(user));
                toast.success(`Welcome, ${user.fullname}!`);
                navigate('/');
            } catch (e) {
                toast.error('Authentication failed. Please try again.');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0F172A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
        }}>
            <Loader2 size={40} color="#2563EB" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#94A3B8', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}>
                Completing sign in...
            </p>
        </div>
    )
}

export default GoogleAuthCallback
