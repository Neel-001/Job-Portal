import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({ job }) {
    const navigate = useNavigate();
    // const jobId = "123456"
    const daysagoFunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) ;
    }
    return (
        <div className="p-6 rounded-3xl shadow-2xl bg-white border border-[#ece9f6] hover:shadow-[0_8px_32px_0_rgba(106,56,194,0.10)] transition-all duration-300 group relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#6A38C2] bg-[#f3f0fa] px-3 py-1 rounded-full shadow-sm">{daysagoFunction(job?.createdAt)==0 ? "Today" : `${daysagoFunction(job?.createdAt)} days ago`}</span>
                <Button variant='outline' className="rounded-full border-[#ece9f6] bg-white hover:bg-[#f3f0fa] transition" size="icon"><Bookmark className="text-[#6A38C2]" /></Button>
            </div>
            <div className="flex items-center gap-4 my-3">
                <div className="w-14 h-14 rounded-xl bg-[#f3f0fa] flex items-center justify-center shadow-md">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h1 className="font-bold text-lg text-[#232946]">{job?.company?.name}</h1>
                    <p className="text-xs text-gray-400">India</p>
                </div>
            </div>
            <div className="mb-3">
                <h1 className="font-extrabold text-xl text-[#232946] mb-1 group-hover:text-[#6A38C2] transition">{job?.title}</h1>
                <p className="text-sm text-gray-500 line-clamp-2">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge className='text-blue-700 font-bold bg-blue-50' variant='ghost'>{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold bg-[#fff0ed]' variant='ghost'>{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold bg-[#f3f0fa]' variant='ghost'>{job?.salary}LPA</Badge>
            </div>
            <div className="flex items-center gap-3 mt-6">
                <Button variant="outline" className="rounded-full border-[#6A38C2] text-[#6A38C2] font-semibold px-6 py-2 hover:bg-[#f3f0fa] transition" onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                <Button className="rounded-full bg-[#7209b7] hover:bg-[#5a2e91] text-white font-semibold px-6 py-2 shadow-md transition">Save for later</Button>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#f3f0fa] rounded-full opacity-60 blur-2xl z-0"></div>
        </div>
    )
}

export default Job
