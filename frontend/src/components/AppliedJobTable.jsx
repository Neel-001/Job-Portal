import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux';

function AppliedJobTable() {
    const {allAppliedJobs} = useSelector(store => store.job);
    return (
        <div className="rounded-2xl shadow-xl border border-[#ece9f6] bg-white p-6">
            <Table>
                <TableCaption className="text-[#6A38C2] font-semibold mb-2">A list of applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-[#f3f0fa]">
                        <TableHead className="text-[#6A38C2] font-bold">Date</TableHead>
                        <TableHead className="text-[#6A38C2] font-bold">Job Role</TableHead>
                        <TableHead className="text-[#6A38C2] font-bold">Company</TableHead>
                        <TableHead className="text-right text-[#6A38C2] font-bold">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length === 0 ? <tr><td colSpan={4} className="text-center text-gray-400 py-4">No applied jobs</td></tr> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-[#f3f0fa] transition">
                                <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell>{appliedJob?.job?.company.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={
                                        appliedJob?.status === "rejected"
                                            ? "bg-red-500 text-white text-md"
                                            : appliedJob.status === "accepted"
                                            ? "bg-green-500 text-white text-md"
                                            : "bg-[#ece9f6] text-[#6A38C2] text-md"
                                    }>
                                        {appliedJob?.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
