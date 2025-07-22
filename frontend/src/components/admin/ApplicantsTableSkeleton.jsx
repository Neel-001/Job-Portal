import React from 'react'

function ApplicantsTableSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow p-6">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      ))}
    </div>
  )
}

export default ApplicantsTableSkeleton
