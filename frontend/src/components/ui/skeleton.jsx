import * as React from "react"

const Skeleton = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-gray-200 rounded-md animate-pulse ${className}`}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

export { Skeleton }
