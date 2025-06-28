import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
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
        if(input.resume){
            formData.append('resume', input.resume);
        }
        if(input.profilePhoto){
            formData.append('profilePhoto', input.profilePhoto);
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
            }, withCredentials: true})

            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        finally{
            setLoading(false);
        }
        setOpen(false);
    }
    return (
        <div>
            <Dialog open={open} >
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="profilePhoto" className="text-right">Profile Photo</Label>
                                <div className="col-span-3 flex items-center gap-4">
                                    <Input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" onChange={profilePhotoChangeHandler} />
                                    {profilePhotoPreview && (
                                        <img src={profilePhotoPreview} alt="Preview" className="h-12 w-12 rounded-full object-cover border border-[#ece9f6]" />
                                    )}
                                </div>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="fullname" className="text-right">Name</Label>
                                <Input id="fullname" className="col-span-3" name="fullname" value={input.fullname} onChange={changeEventHandler} type="text" />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input id="email" className="col-span-3" value={input.email} name="email" onChange={changeEventHandler} type="email" />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="phoneNumber" className="text-right">Number</Label>
                                <Input id="phoneNumber" className="col-span-3" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input id="bio" className="col-span-3" value={input.bio} name="bio" onChange={changeEventHandler} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input id="skills" className="col-span-3" value={input.skills} name="skills" onChange={changeEventHandler} />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="resume" className="text-right">Resume</Label>
                                <div className="col-span-3 flex items-center gap-4">
                                    <Input id="resume" name="resume" type="file" accept="application/pdf" onChange={resumeChangeHandler} />
                                    {resumeName && (
                                        <span className="text-xs text-[#6A38C2] font-semibold">{resumeName}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className="w-full my-4">Update Profile</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
