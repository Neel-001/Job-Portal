import React from 'react'

function CompanySetupSkeleton() {
  return (
    <div className="animate-pulse p-8 bg-white rounded-xl shadow-md max-w-xl mx-auto my-10">
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded mb-4"></div>
        ))}
      </div>
      <div className="h-10 bg-gray-200 rounded w-full mt-8"></div>
    </div>
  )
}

export default CompanySetupSkeleton
