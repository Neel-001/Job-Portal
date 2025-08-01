import React, { useEffect, useState } from 'react'
// ...existing code...
import CompanySetupSkeleton from './CompanySetupSkeleton'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useCompanyById from '@/hooks/useCompanyById'

function CompanySetup() {
    const params = useParams()
    useCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    })
    const {singleCompany} = useSelector((store) => store.company)
    const [loading, setLoading] = useState(true)
    
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        
        // Only append fields that have values
        if (input.name.trim()) formData.append('name', input.name);
        if (input.description.trim()) formData.append('description', input.description);
        if (input.website.trim()) formData.append('website', input.website);
        if (input.location.trim()) formData.append('location', input.location);
        if (input.file) {
            formData.append('file', input.file);
        }
        
        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }, withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setLoading(true)
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null,
        })
        // Set loading false as soon as company data is available
        if (singleCompany && singleCompany.name) {
            setLoading(false)
        }
    }, [singleCompany])
    if (loading) {
        return <CompanySetupSkeleton />
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form action="" onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button className="flex items-center gap-2 text-gray-500 font-semibold" variant="outline" onClick = {() => navigate("/admin/companies")}> 
                            <ArrowLeft />
                            <span >Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input type="text" value={input.name} onChange={changeEventHandler} name="name" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" value={input.description} onChange={changeEventHandler} name="description" />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type="text" value={input.website} onChange={changeEventHandler} name="website" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" value={input.location} onChange={changeEventHandler} name="location" />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} name="file" />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
