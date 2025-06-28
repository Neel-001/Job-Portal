import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CompaniesTable() {
    const companies = useSelector(store => store.company.companies) || [];
    const [filterCompany,setFilterCompany] = useState(companies)
    const {searchCompanyByText} = useSelector(store => store.company)
    const navigate = useNavigate()
    useEffect(() => {
        const filteredCompanies = companies.length >=0 && companies.filter((company) => {
            if(!searchCompanyByText) return true;
            return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompanies)
    },[companies,searchCompanyByText])
    return (
        <div className="w-full">
            <Table className="w-full bg-white/95 border border-[#e0e7ff] rounded-2xl shadow-xl text-base">
                <TableCaption className="text-[#6A38C2] font-semibold">A list of your recent registered companies</TableCaption>
                <TableHeader className="bg-[#f3f0fa] text-lg">
                    <TableRow>
                        <TableHead className="text-[#6A38C2] font-bold py-4">Logo</TableHead>
                        <TableHead className="text-[#6A38C2] font-bold py-4">Name</TableHead>
                        <TableHead className="text-[#6A38C2] font-bold py-4">Date</TableHead>
                        <TableHead className="text-right text-[#6A38C2] font-bold py-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-[#F83002] font-semibold">You haven't registered any company yet</TableCell>
                            </TableRow>
                        ) : (
                            filterCompany.map((company) => (
                                <TableRow key={company._id} className="hover:bg-[#ece9f6]/60 transition text-base">
                                    <TableCell className="py-4">
                                        <Avatar>
                                            <AvatarImage src={company.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="py-4">{company.name}</TableCell>
                                    <TableCell className="py-4">{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer py-4">
                                         <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick = {()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
