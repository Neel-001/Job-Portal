import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Loader2, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios';

function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.join(', ') || '',
        resume: null,
        profilePhoto: null
    })
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(user?.profile?.profilePhoto || null);
    const [resumeName, setResumeName] = useState(user?.profile?.resumeOriginalName || '');
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const profilePhotoChangeHandler = (e) => {
        const file = e.target?.files[0];
        setInput({ ...input, profilePhoto: file });
        if (file) {
            setProfilePhotoPreview(URL.createObjectURL(file));
        }
    }

    const resumeChangeHandler = (e) => {
        const file = e.target?.files[0];
        setInput({ ...input, resume: file });
        if (file) {
            setResumeName(file.name);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.resume) { formData.append('resume', input.resume); }
        if (input.profilePhoto) { formData.append('profilePhoto', input.profilePhoto); }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
        setOpen(false);
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

    return (
        <Dialog open={open}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                style={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    color: '#F8FAFC',
                    maxWidth: '480px',
                    padding: '32px',
                }}
            >
                <DialogHeader>
                    <DialogTitle style={{ color: '#F8FAFC', fontSize: '18px', fontWeight: '700' }}>
                        Edit Profile
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                    {/* Profile Photo */}
                    <div>
                        <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: '500', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Profile Photo
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {profilePhotoPreview && (
                                <img src={profilePhotoPreview} alt="Preview" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #334155' }} />
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
                            }}>
                                {input.profilePhoto?.name || 'Choose new photo'}
                                <input type="file" accept="image/*" onChange={profilePhotoChangeHandler} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>

                    {/* Fields */}
                    {[
                        { label: 'Full Name', name: 'fullname', type: 'text', placeholder: 'Your full name' },
                        { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
                        { label: 'Phone Number', name: 'phoneNumber', type: 'text', placeholder: 'Your phone number' },
                        { label: 'Bio', name: 'bio', type: 'text', placeholder: 'Short bio...' },
                        { label: 'Skills (comma separated)', name: 'skills', type: 'text', placeholder: 'React, Node.js, Python...' },
                    ].map(({ label, name, type, placeholder }) => (
                        <div key={name}>
                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={input[name] || ''}
                                onChange={changeEventHandler}
                                placeholder={placeholder}
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#2563EB'}
                                onBlur={e => e.target.style.borderColor = '#334155'}
                            />
                        </div>
                    ))}

                    {/* Resume */}
                    <div>
                        <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Resume (PDF)
                        </label>
                        <label style={{
                            display: 'block',
                            padding: '10px 14px',
                            backgroundColor: '#0F172A',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            color: '#64748B',
                            fontSize: '13px',
                            cursor: 'pointer',
                        }}>
                            {resumeName || 'Upload PDF resume'}
                            <input type="file" accept="application/pdf" onChange={resumeChangeHandler} style={{ display: 'none' }} />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            style={{
                                flex: 1,
                                padding: '10px',
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
                                flex: 1,
                                padding: '10px',
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
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog
