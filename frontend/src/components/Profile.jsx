import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'

import { AvatarImage, Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpcomingInterviews from './UpcomingInterviews';
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import ProfileSkeleton from './ProfileSkeleton'


// const skills = ["html", "css", "js", "react js"]

function Profile() {
    const isResume = true;
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        // Simulate data fetch: set loading false when user data is available
        if (user) {
            setLoading(false)
        }
    }, [user])
    if (loading) {
        return <ProfileSkeleton />
    }
    return (
        <div className="bg-gradient-to-br from-[#f3f0fa] to-[#ece9f6] min-h-screen pb-10">
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-[#ece9f6] rounded-3xl my-10 p-10 shadow-2xl'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
                    <div className='flex items-center gap-6'>
                        <Avatar className="h-28 w-28 ring-4 ring-[#6A38C2] shadow-lg">
                            <AvatarImage
                                src={user?.profile?.profilePhoto ? user.profile.profilePhoto : "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-black text-2xl text-[#232946]'>{user?.fullname}</h1>
                            <p className='text-gray-500'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button className="rounded-full border-[#6A38C2] text-[#6A38C2] font-semibold px-6 py-2 hover:bg-[#f3f0fa] transition" variant="outline" onClick={() => setOpen(true)}><Pen className="mr-2" />Edit</Button>
                </div>
                <div className='my-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex items-center gap-3 bg-[#f3f0fa] rounded-xl p-4'>
                        <Mail className='text-[#6A38C2]' />
                        <span className='text-[#232946] font-medium'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 bg-[#f3f0fa] rounded-xl p-4'>
                        <Contact className='text-[#6A38C2]' />
                        <span className='text-[#232946] font-medium'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-8'>
                    <h1 className='font-bold text-lg text-[#6A38C2] mb-2'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-2'>
                        {user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, idx) => <Badge key={idx} className="text-sm p-2 m-1 bg-[#ece9f6] text-[#6A38C2] font-semibold">{item}</Badge>) : <span className='text-gray-400'>No skills</span>}
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold text-[#232946]">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-[#6A38C2] w-full hover:underline cursor-pointer font-semibold'>{user?.profile?.resumeOriginalName}</a> : <span className='text-gray-400'>No Resume Available</span>
                    }
                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <div className='max-w-4xl mx-auto'>
                <UpcomingInterviews userId={user?._id} />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
