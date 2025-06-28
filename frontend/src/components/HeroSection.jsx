import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
    const [query,setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchJobHandler = ()=>{
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-[#232946] to-[#6A38C2] py-16 px-4 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-40 opacity-30">
                    <path fill="#fff" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,197.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <span className="mx-auto px-6 py-2 rounded-full bg-white/80 text-[#F83002] font-semibold shadow-md tracking-wide mb-4 text-base">No. 1 Job Hunt Website</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 leading-tight">Search, Apply &<br />Get Your <span className="text-[#F83002]">Dream Jobs</span></h1>
            <p className="text-lg text-white/90 max-w-2xl mb-8">Find the best opportunities, apply instantly, and take the next step in your career journey. Your dream job is just a search away!</p>
            <div className="flex w-full max-w-xl shadow-xl border border-white/30 rounded-full bg-white/90 mx-auto backdrop-blur-sm">
                <input
                    type="text"
                    placeholder="Find your dream jobs"
                    className="outline-none border-none w-full bg-transparent text-lg px-6 py-3 rounded-l-full text-[#232946] placeholder:text-gray-400"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    className="rounded-r-full bg-[#F83002] hover:bg-[#d12a00] text-white px-6 py-3 text-lg font-semibold transition h-full m-auto"
                    onClick={searchJobHandler}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <Search className="h-6 w-6" />
                </Button>
            </div>
        </section>
    )
}

export default HeroSection
