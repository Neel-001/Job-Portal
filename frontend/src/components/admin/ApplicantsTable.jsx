import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, Users, CalendarCheck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useState } from 'react';
import ScheduleInterviewModal from '../ScheduleInterviewModal';

const shortlistingStatus = ["Accepted", "Rejected"];

function ApplicantsTable({ loading = false }) {
    const { applicants } = useSelector((store) => store.application);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleSchedule = (applicantId, jobId) => {
        setSelectedApplicant({ applicantId, jobId });
        setModalOpen(true);
    };

    if (!applicants?.applications?.length) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
                <div style={{ width: '52px', height: '52px', backgroundColor: '#0F172A', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={24} color="#334155" />
                </div>
                <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>No applicants yet for this job</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#111827' }}>
                            {['Applicant', 'Email', 'Phone', 'Resume', 'Applied', 'Status', 'Interview'].map(h => (
                                <th key={h} style={{
                                    padding: '12px 16px',
                                    textAlign: 'left',
                                    color: '#64748B',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {applicants?.applications?.map((item) => (
                            <tr
                                key={item._id}
                                style={{ borderBottom: '1px solid #1E293B', transition: 'background-color 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#111827'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{ padding: '14px 16px', color: '#F8FAFC', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                                    {item?.applicant?.fullname}
                                </td>
                                <td style={{ padding: '14px 16px', color: '#94A3B8', fontSize: '13px' }}>
                                    {item?.applicant?.email}
                                </td>
                                <td style={{ padding: '14px 16px', color: '#94A3B8', fontSize: '13px' }}>
                                    {item?.applicant?.phoneNumber}
                                </td>
                                <td style={{ padding: '14px 16px', fontSize: '13px' }}>
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            href={item?.applicant?.profile?.resume}
                                            target='_blank'
                                            rel="noopener noreferrer"
                                            style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: '500' }}
                                            onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                                            onMouseLeave={e => e.target.style.textDecoration = 'none'}
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName?.substring(0, 15)}...
                                        </a>
                                    ) : (
                                        <span style={{ color: '#475569' }}>N/A</span>
                                    )}
                                </td>
                                <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '13px', whiteSpace: 'nowrap' }}>
                                    {item?.createdAt.split("T")[0]}
                                </td>
                                <td style={{ padding: '14px 16px' }}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button style={{
                                                backgroundColor: 'transparent',
                                                border: '1px solid #334155',
                                                borderRadius: '6px',
                                                width: '30px',
                                                height: '30px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                color: '#64748B',
                                            }}>
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" style={{
                                            backgroundColor: '#1E293B',
                                            border: '1px solid #334155',
                                            borderRadius: '8px',
                                            padding: '6px',
                                            width: '140px',
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                                        }}>
                                            {shortlistingStatus.map((status, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => statusHandler(status, item._id)}
                                                    style={{
                                                        display: 'flex',
                                                        width: '100%',
                                                        padding: '8px 10px',
                                                        borderRadius: '6px',
                                                        border: 'none',
                                                        backgroundColor: 'transparent',
                                                        color: status === 'Accepted' ? '#4ADE80' : '#F87171',
                                                        fontSize: '13px',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        fontFamily: 'Inter, sans-serif',
                                                        fontWeight: '500',
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#334155'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </td>
                                <td style={{ padding: '14px 16px' }}>
                                    {(() => {
                                        const jobId = item.job?._id || item.job || undefined;
                                        return (
                                            <button
                                                onClick={() => handleSchedule(item.applicant?._id, jobId)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid rgba(37,99,235,0.3)',
                                                    backgroundColor: 'rgba(37,99,235,0.08)',
                                                    color: '#60A5FA',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap',
                                                    fontFamily: 'Inter, sans-serif',
                                                    transition: 'all 0.15s',
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(37,99,235,0.15)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(37,99,235,0.08)'; }}
                                            >
                                                <CalendarCheck size={12} /> Schedule
                                            </button>
                                        );
                                    })()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && selectedApplicant && (
                <ScheduleInterviewModal
                    applicantId={selectedApplicant.applicantId}
                    jobId={selectedApplicant.jobId}
                    onClose={() => setModalOpen(false)}
                    onScheduled={() => { }}
                />
            )}
        </div>
    );
}

export default ApplicantsTable;
