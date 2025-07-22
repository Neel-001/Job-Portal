
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import ApplicantsTableSkeleton from './ApplicantsTableSkeleton'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
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
    if (loading) {
        return <ApplicantsTableSkeleton />;
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fullname</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                        <TableHead>Interview</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants?.applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell className="text-blue-700 cursor-pointer">
                                {item?.applicant?.profile?.resume ? (
                                    <a href={item?.applicant?.profile?.resume} target='_blank' rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>
                                ) : (
                                    "NA"
                                )}
                            </TableCell>
                            <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {shortlistingStatus.map((status, idx) => (
                                            <div onClick={() => statusHandler(status, item._id)} key={idx} className='flex items-center w-fit my-2 cursor-pointer'>
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell>
                                {(() => {
                                  // Fallback: handle both populated and non-populated job field
                                  const jobId = item.job?._id || item.job || undefined;
                                  // Debug log
                                  if (!jobId) console.warn('No jobId for application:', item);
                                  return (
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => handleSchedule(item.applicant?._id, jobId)}>
                                      Schedule Interview
                                    </button>
                                  );
                                })()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {modalOpen && selectedApplicant && (
                <ScheduleInterviewModal
                    applicantId={selectedApplicant.applicantId}
                    jobId={selectedApplicant.jobId}
                    onClose={() => setModalOpen(false)}
                    onScheduled={() => {}}
                />
            )}
        </div>
    );
}

export default ApplicantsTable;
