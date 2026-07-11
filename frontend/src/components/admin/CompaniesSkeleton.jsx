import React from 'react'

function CompaniesSkeleton() {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: '1px solid #1E293B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ height: '40px', width: '40px', backgroundColor: '#334155', borderRadius: '8px' }}></div>
            <div style={{ height: '16px', backgroundColor: '#334155', borderRadius: '4px', width: '120px' }}></div>
          </div>
          <div style={{ height: '14px', backgroundColor: '#334155', borderRadius: '4px', width: '80px' }}></div>
        </div>
      ))}
    </div>
  )
}

export default CompaniesSkeleton
