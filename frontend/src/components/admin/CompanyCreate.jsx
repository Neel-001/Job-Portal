import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

function CompanyCreate() {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState()
    const dispatch = useDispatch()
    const registerNewCompany = async () =>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers : {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res?.data?.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] pb-10 flex flex-col">
            <Navbar />
            <div className="flex flex-1 items-center justify-center py-12">
                <div className="w-full max-w-2xl bg-white/95 border border-[#e0e7ff] rounded-3xl shadow-2xl p-10 backdrop-blur-lg">
                    <h1 className="font-black text-3xl md:text-4xl text-[#232946] mb-4 text-center drop-shadow-lg tracking-tight">Your Company Name</h1>
                    <p className="text-[#6A38C2] text-center mb-8">What would you like to change your company name? You can change this later.</p>
                    <div className="my-4 gap-2 flex flex-col">
                        <Label className="font-semibold text-[#232946]">Company Name</Label>
                        <Input type="text" className="rounded-xl bg-[#f3f0fa] border-0 px-5 py-3 text-lg font-medium text-[#232946] placeholder:text-[#6A38C2]/60 shadow focus:bg-white/90 transition my-2" placeholder="Microsoft etc." onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-4 my-10 justify-center">
                        <Button variant="outline" className="rounded-full px-8 py-3 font-bold" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                        <Button className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#F83002] hover:to-[#6A38C2] text-white font-bold px-8 py-3 shadow-lg transition" onClick={registerNewCompany}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
