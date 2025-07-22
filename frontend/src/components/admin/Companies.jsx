import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import CompaniesSkeleton from './CompaniesSkeleton'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    const navigate = useNavigate()
    useGetAllCompanies();
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input, dispatch])
    useEffect(() => {
        setLoading(true)
        // Simulate data fetch: set loading false when companies are loaded
        const unsubscribe = setTimeout(() => setLoading(false), 0)
        return () => clearTimeout(unsubscribe)
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#ece9f6] to-[#e0e7ff] pb-10 flex flex-col">
            <Navbar />
            <div className="max-w-7xl mx-auto my-12 p-14 bg-white/95 border border-[#e0e7ff] rounded-3xl shadow-2xl backdrop-blur-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <Input
                        className="w-full md:w-1/2 bg-[#f3f0fa] border-0 rounded-full px-6 py-3 text-lg font-semibold text-[#232946] placeholder:text-[#6A38C2]/60 shadow"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:from-[#F83002] hover:to-[#6A38C2] text-white font-bold px-8 py-3 shadow-lg transition" onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <div className="mt-8">
                    {loading ? <CompaniesSkeleton /> : <CompaniesTable />}
                </div>
            </div>
        </div>
    )
}

export default Companies
