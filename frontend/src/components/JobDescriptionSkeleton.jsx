import React from 'react'
import { Skeleton } from '../components/ui/skeleton'

function JobDescriptionSkeleton() {
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <Skeleton className="h-8 w-1/2 mb-4" />
      <Skeleton className="h-4 w-1/3 mb-2" />
      <Skeleton className="h-4 w-1/4 mb-6" />
      <Skeleton className="h-32 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3 mb-2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  )
}

export default JobDescriptionSkeleton
