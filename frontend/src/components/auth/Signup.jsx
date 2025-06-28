import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
function Signup() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store=>store.auth)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();;
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if(res.data.success){
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] flex flex-col pb-10">
            <Navbar />
            <div className="flex flex-1 items-center justify-center py-12">
                <form onSubmit={submitHandler} className="w-full max-w-lg bg-white/95 border border-[#e0e7ff] rounded-3xl shadow-2xl p-10 backdrop-blur-lg">
                    <h1 className="text-3xl font-black text-center mb-8 text-[#232946] tracking-tight drop-shadow-lg">
                        Sign Up
                    </h1>
                    <div className="my-4 gap-2 flex flex-col">
                        <Label className="font-semibold text-[#232946]">Full Name</Label>
                        <Input type="text" placeholder="Enter Full Name" value={input.fullname} name="fullname" onChange={changeEventHandler} className="rounded-xl bg-[#f3f0fa] border-0 px-5 py-3 text-lg font-medium text-[#232946] placeholder:text-[#6A38C2]/60 shadow focus:bg-white/90 transition" />
                    </div>
                    <div className="my-4 gap-2 flex flex-col">
                        <Label className="font-semibold text-[#232946]">Email</Label>
                        <Input type="email" placeholder="Email" value={input.email} name="email" onChange={changeEventHandler} className="rounded-xl bg-[#f3f0fa] border-0 px-5 py-3 text-lg font-medium text-[#232946] placeholder:text-[#6A38C2]/60 shadow focus:bg-white/90 transition" />
                    </div>
                    <div className="my-4 gap-2 flex flex-col">
                        <Label className="font-semibold text-[#232946]">Phone Number</Label>
                        <Input type="text" placeholder="Enter Phone Number" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} className="rounded-xl bg-[#f3f0fa] border-0 px-5 py-3 text-lg font-medium text-[#232946] placeholder:text-[#6A38C2]/60 shadow focus:bg-white/90 transition" />
                    </div>
                    <div className="my-4 gap-2 flex flex-col">
                        <Label className="font-semibold text-[#232946]">Password</Label>
                        <Input type="password" placeholder="Enter Password" value={input.password} name="password" onChange={changeEventHandler} className="rounded-xl bg-[#f3f0fa] border-0 px-5 py-3 text-lg font-medium text-[#232946] placeholder:text-[#6A38C2]/60 shadow focus:bg-white/90 transition" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-6">
                        <RadioGroup className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" className="cursor-pointer accent-[#6A38C2]" checked={input.role == "student"} onChange={changeEventHandler} />
                                <Label htmlFor="option-one" className="font-semibold text-[#232946]">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer accent-[#F83002]" checked={input.role == "recruiter"} onChange={changeEventHandler} />
                                <Label htmlFor="option-two" className="font-semibold text-[#232946]">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-2">
                            <Label className="font-semibold text-[#232946]">Profile</Label>
                            <Input accept="Image/*" type="file" className="cursor-pointer" onChange={changeFileHandler} />
                        </div>
                    </div>
                    <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#F83002] hover:to-[#6A38C2] text-white font-bold px-8 py-3 shadow-lg transition text-lg mt-6" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin w-6 h-6 mx-auto" /> : 'Sign Up'}
                    </Button>
                    <div className="text-center mt-6">
                        <span className="text-[#232946]">Already have an account? </span>
                        <Link to="/login" className="text-[#6A38C2] font-bold hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
