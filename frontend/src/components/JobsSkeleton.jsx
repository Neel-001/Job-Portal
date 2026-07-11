import React from 'react'

function JobsSkeleton() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px',
    }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse"
          style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '24px',
            height: '240px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ height: '24px', backgroundColor: '#334155', borderRadius: '4px', width: '60%' }}></div>
          <div style={{ height: '16px', backgroundColor: '#334155', borderRadius: '4px', width: '40%' }}></div>
          <div style={{ height: '40px', backgroundColor: '#334155', borderRadius: '4px', width: '100%', marginTop: 'auto' }}></div>
        </div>
      ))}
    </div>
  )
}

export default JobsSkeleton
