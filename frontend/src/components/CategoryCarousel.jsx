import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
]

function CategoryCarousel() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
    return (
        <div className="w-full max-w-4xl mx-auto my-20 px-4">
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        category.map((cat, idx) => (
                            <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                                <Button className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold px-8 py-3 shadow-lg hover:scale-105 transition-all duration-200" onClick={()=>searchJobHandler(cat)} >{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div >
    )
}

export default CategoryCarousel
