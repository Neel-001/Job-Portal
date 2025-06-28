import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType : "Location",
        array : ["Delhi NCR","Bangalore","Hyderabadad","Mumbai","Pune"]
    },
    {
        filterType : "Industry",
        array : ["Frontend Developer","Backend Developer","Full Stack Developer"]
    },
    {
        filterType : "Salary",
        array : ["0-42k","42-1lakh","1lakh to 5 lakh"]
    },
]
function FilterCard() {
    const dispatch = useDispatch();
    const [selected,setSelected] = useState('')
    const changeHandler = (val)=>{
        setSelected(val)
    }
    useEffect(()=>{
       dispatch(setSearchedQuery(selected)) 
    },[selected])
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-xl border border-[#ece9f6]">
      <h1 className="font-extrabold text-xl text-[#232946] mb-2">Filter Jobs</h1>
      <hr className="my-3 border-[#ece9f6]" />
      <RadioGroup onValueChange={changeHandler} value={selected}>
        {filterData.map((data, idx) => (
          <div key={data.filterType} className="mb-4">
            <h2 className="font-bold text-lg text-[#6A38C2] mb-2">{data.filterType}</h2>
            {data.array.map((item, idx2) => (
              <div className="flex items-center gap-2 my-2 p-1" key={item}>
                <RadioGroupItem value={item} className="mx-1 accent-[#6A38C2]" id={`r${idx}-${idx2}`}/>
                <Label htmlFor={`r${idx}-${idx2}`} className="text-[#232946] text-base cursor-pointer">{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
