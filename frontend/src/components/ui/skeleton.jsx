import * as React from "react"

const Skeleton = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`animate-pulse ${className}`}
    style={{
      backgroundColor: '#334155',
      borderRadius: '8px',
    }}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

export { Skeleton }
