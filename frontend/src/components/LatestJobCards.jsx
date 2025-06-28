import { Badge } from '@/components/ui/badge'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({job}) {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`/description/${job._id}`)} className="p-6 rounded-3xl shadow-2xl bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] border border-[#ece9f6] hover:shadow-[0_8px_32px_0_rgba(106,56,194,0.10)] transition-all duration-300 cursor-pointer group relative overflow-hidden">
            <div>
                <h1 className="font-bold text-lg text-[#232946]">{job?.company?.name}</h1>
                <p className="text-xs text-gray-400">India</p>
            </div>
            <div>
                <div className="font-extrabold text-xl my-2 text-[#232946] group-hover:text-[#6A38C2] transition">{job?.title}</div>
                <p className="text-sm text-gray-500 line-clamp-2">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className='text-blue-700 font-bold bg-blue-50' variant='ghost'>{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold bg-[#fff0ed]' variant='ghost'>{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold bg-[#f3f0fa]' variant='ghost'>{job?.salary}LPA</Badge>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#f3f0fa] rounded-full opacity-60 blur-2xl z-0"></div>
        </div>
    )
}

export default LatestJobCards
