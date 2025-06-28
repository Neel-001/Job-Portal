import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from 'react';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';


const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <header className="bg-gradient-to-r from-[#232946] to-[#6A38C2] shadow-xl sticky top-0 z-50 border-b border-[#ffffff22] backdrop-blur-md">
            <nav className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
                <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-[#6A38C2]">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6A38C2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><polyline points="7 9 12 4 17 9"/><line x1="12" y1="4" x2="12" y2="16"/></svg>
                    </span>
                    <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-lg select-none">Talent<span className="text-[#F83002]">Nest</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-semibold items-center gap-8 text-lg text-white drop-shadow-sm">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link className="hover:text-[#F83002] transition-colors duration-200 px-2 py-1 rounded-md hover:bg-white/10" to='/admin/companies'>Companies</Link></li>
                                    <li><Link className="hover:text-[#F83002] transition-colors duration-200 px-2 py-1 rounded-md hover:bg-white/10" to='/admin/jobs'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className="hover:text-[#F83002] transition-colors duration-200 px-2 py-1 rounded-md hover:bg-white/10" to='/'>Home</Link></li>
                                    <li><Link className="hover:text-[#F83002] transition-colors duration-200 px-2 py-1 rounded-md hover:bg-white/10" to='/jobs'>Jobs</Link></li>
                                    <li><Link className="hover:text-[#F83002] transition-colors duration-200 px-2 py-1 rounded-md hover:bg-white/10" to='/browse'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <Button
                                        className="rounded-full bg-white/80 text-[#6A38C2] border border-[#e0e7ff] hover:bg-white/95 hover:shadow-lg hover:border-[#6A38C2] font-semibold px-6 py-2 shadow-sm backdrop-blur-md transition-colors duration-200"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="rounded-full bg-[#F83002] hover:bg-[#d12a00] text-white shadow-lg transition font-semibold px-6 py-2">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer ring-2 ring-[#F83002] ring-offset-2 ring-offset-[#232946] shadow-lg'>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback className="bg-[#6A38C2] text-white font-bold">{user?.fullname?.[0]}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 p-4 rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-md mt-2'>
                                    <div className='flex items-center gap-4 mb-4'>
                                        <Avatar className='cursor-pointer w-14 h-14 ring-2 ring-[#6A38C2] shadow-md'>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback className="bg-[#6A38C2] text-white font-bold text-xl">{user?.fullname?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-bold text-lg text-[#232946]'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        {
                                            user && user.role === 'student' && (
                                                <Link to="/profile" className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F83002]/10 transition-colors text-[#232946] font-medium'>
                                                    <User2 className='w-5 h-5 text-[#6A38C2]' />
                                                    View Profile
                                                </Link>
                                            )
                                        }
                                        <button onClick={logoutHandler} className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F83002]/10 transition-colors text-[#F83002] font-medium'>
                                            <LogOut className='w-5 h-5' />
                                            Logout
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar;