import React from 'react'

function ProfileSkeleton() {
  return (
    <div className="animate-pulse max-w-xl mx-auto my-10 bg-white rounded-xl shadow-md p-8">
      <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
    </div>
  )
}

export default ProfileSkeleton
