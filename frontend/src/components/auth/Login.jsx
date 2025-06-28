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
import { setLoading, setUser } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'
function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            const message =
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Something went wrong. Please try again.";
            toast.error(message);
        }
        finally {
            dispatch(setLoading(false));
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] flex flex-col">
            <Navbar />
            <div className="flex flex-1 items-center justify-center">
                <form onSubmit={submitHandler} className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-[#ece9f6]">
                    <h1 className="text-3xl font-black text-[#6A38C2] mb-8 text-center drop-shadow-lg">Login</h1>
                    <div className='my-4 gap-2 flex flex-col'>
                        <Label className="text-[#232946] font-semibold">Email</Label>
                        <Input type="email" placeholder="Email" value={input.email} name="email" onChange={changeEventHandler} className="rounded-full px-6 py-3 border-[#ece9f6] focus:ring-2 focus:ring-[#6A38C2]" />
                    </div>
                    <div className='my-4 gap-2 flex flex-col'>
                        <Label className="text-[#232946] font-semibold">Password</Label>
                        <Input type="password" placeholder="Enter Password" value={input.password} name="password" onChange={changeEventHandler} className="rounded-full px-6 py-3 border-[#ece9f6] focus:ring-2 focus:ring-[#6A38C2]" />
                    </div>
                    <div className='flex items-center justify-between my-6'>
                        <RadioGroup className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Input type="radio" name="role" value="student" className="cursor-pointer accent-[#6A38C2]" checked={input.role == "student"} onChange={changeEventHandler} />
                                <Label htmlFor="option-one" className="text-[#6A38C2] font-semibold">Student</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer accent-[#F83002]" checked={input.role == "recruiter"} onChange={changeEventHandler} />
                                <Label htmlFor="option-two" className="text-[#F83002] font-semibold">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-bold shadow-lg py-3"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className="w-full my-4 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-bold shadow-lg py-3">Login</Button>
                    }
                    <span className='text-sm block text-center mt-2'>Don't have an account? <Link to='/signup' className='text-[#F83002] font-semibold hover:underline'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
