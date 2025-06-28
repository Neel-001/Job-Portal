import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminJobsTable() {
    const {allAdminJobs} = useSelector(store => store.job)
    const [filterJobs,setFilterJobs] = useState(allAdminJobs)
    const {searchJobByText} = useSelector(store => store.job)
    const navigate = useNavigate()
    useEffect(() => {
        const filteredJobs = allAdminJobs.length >=0 && allAdminJobs.filter((job) => {
            if(!searchJobByText) return true;

            return (job?.title && job.title.toLowerCase().includes(searchJobByText.toLowerCase())) || (job?.company?.name && job.company.name.toLowerCase().includes(searchJobByText.toLowerCase()));
        })
        setFilterJobs(filteredJobs)
    },[allAdminJobs,searchJobByText])
    return (
        <div className="w-full">
            <Table className="w-full bg-white/95 border border-[#e0e7ff] rounded-2xl shadow-xl text-base">
                <TableCaption className="text-[#6A38C2] font-semibold">A list of your recent posted jobs</TableCaption>
                <TableHeader className="bg-[#f3f0fa] text-lg">
                    <TableRow>
                        <TableHead className="text-[#6A38C2] font-bold py-4">Company Name</TableHead>
                        <TableHead className="text-[#6A38C2] font-bold py-4">Role</TableHead>
                        <TableHead className="text-[#6A38C2] font-bold py-4">Date</TableHead>
                        <TableHead className="text-right text-[#6A38C2] font-bold py-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-[#F83002] font-semibold">You haven't registered any company yet</TableCell>
                            </TableRow>
                        ) : (
                            filterJobs.map((job) => (
                                <TableRow key={job._id} className="hover:bg-[#ece9f6]/60 transition text-base">
                                    <TableCell className="py-4">{job?.company?.name}</TableCell>
                                    <TableCell className="py-4">{job?.title}</TableCell>
                                    <TableCell className="py-4">{job?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer py-4">
                                         <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick = {()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer'>
                                                    <Eye className='w-4'/>
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
