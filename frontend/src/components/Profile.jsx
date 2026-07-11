import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import { AvatarImage, Avatar, AvatarFallback } from './ui/avatar'
import { Contact, Mail, Pen, FileText, Download } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpcomingInterviews from './UpcomingInterviews';
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import ProfileSkeleton from './ProfileSkeleton'

function Profile() {
    const isResume = true;
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if (user) {
            setLoading(false)
        }
    }, [user])

    if (loading) {
        return <ProfileSkeleton />
    }

    return (
        <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Profile Card */}
                <div style={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    padding: '32px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Avatar style={{ width: '80px', height: '80px', border: '2px solid #334155', borderRadius: '50%' }}>
                                <AvatarImage
                                    src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                                    style={{ objectFit: 'cover' }}
                                />
                                <AvatarFallback style={{ backgroundColor: '#2563EB', color: '#fff', fontSize: '28px', fontWeight: '700' }}>
                                    {user?.fullname?.[0]?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 style={{ color: '#F8FAFC', fontSize: '22px', fontWeight: '700', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                                    {user?.fullname}
                                </h1>
                                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 10px', lineHeight: '1.5', maxWidth: '400px' }}>
                                    {user?.profile?.bio || 'No bio added yet.'}
                                </p>
                                <span style={{
                                    display: 'inline-block',
                                    backgroundColor: 'rgba(37,99,235,0.1)',
                                    color: '#60A5FA',
                                    border: '1px solid rgba(37,99,235,0.25)',
                                    borderRadius: '6px',
                                    padding: '3px 10px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    textTransform: 'capitalize',
                                }}>
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #334155',
                                backgroundColor: 'transparent',
                                color: '#94A3B8',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.color = '#F8FAFC'; e.currentTarget.style.backgroundColor = '#334155'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <Pen size={14} /> Edit Profile
                        </button>
                    </div>

                    {/* Contact info */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #334155' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', backgroundColor: '#0F172A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Mail size={16} color="#2563EB" />
                            </div>
                            <div>
                                <p style={{ color: '#475569', fontSize: '11px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
                                <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0, fontWeight: '500' }}>{user?.email}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', backgroundColor: '#0F172A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Contact size={16} color="#2563EB" />
                            </div>
                            <div>
                                <p style={{ color: '#475569', fontSize: '11px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</p>
                                <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0, fontWeight: '500' }}>{user?.phoneNumber || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills + Resume row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Skills */}
                    <div style={{
                        backgroundColor: '#1E293B',
                        border: '1px solid #334155',
                        borderRadius: '16px',
                        padding: '24px',
                    }}>
                        <h2 style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>Skills</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {user?.profile?.skills?.length !== 0 ? (
                                user?.profile?.skills?.map((item, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            backgroundColor: '#334155',
                                            color: '#94A3B8',
                                            borderRadius: '6px',
                                            padding: '4px 12px',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))
                            ) : (
                                <span style={{ color: '#475569', fontSize: '13px' }}>No skills added yet.</span>
                            )}
                        </div>
                    </div>

                    {/* Resume */}
                    <div style={{
                        backgroundColor: '#1E293B',
                        border: '1px solid #334155',
                        borderRadius: '16px',
                        padding: '24px',
                    }}>
                        <h2 style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>Resume</h2>
                        {isResume && user?.profile?.resume ? (
                            <a
                                href={user?.profile?.resume}
                                target='blank'
                                style={{ textDecoration: 'none' }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px',
                                    backgroundColor: '#0F172A',
                                    borderRadius: '8px',
                                    border: '1px solid #334155',
                                    transition: 'border-color 0.15s',
                                    cursor: 'pointer',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}
                                >
                                    <FileText size={20} color="#2563EB" />
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <p style={{ color: '#F8FAFC', fontSize: '13px', fontWeight: '500', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {user?.profile?.resumeOriginalName}
                                        </p>
                                        <p style={{ color: '#475569', fontSize: '11px', margin: 0 }}>PDF Document</p>
                                    </div>
                                    <Download size={14} color="#475569" />
                                </div>
                            </a>
                        ) : (
                            <span style={{ color: '#475569', fontSize: '13px' }}>No resume uploaded.</span>
                        )}
                    </div>
                </div>

                {/* Applied Jobs */}
                <div style={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    padding: '24px',
                }}>
                    <h2 style={{ color: '#F8FAFC', fontSize: '16px', fontWeight: '600', margin: '0 0 20px' }}>Applied Jobs</h2>
                    <AppliedJobTable />
                </div>

                {/* Upcoming Interviews */}
                <UpcomingInterviews userId={user?._id} />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
