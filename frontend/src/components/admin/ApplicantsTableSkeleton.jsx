import React from 'react'

function ApplicantsTableSkeleton() {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ height: '20px', backgroundColor: '#334155', borderRadius: '4px', width: '30%', marginBottom: '8px' }}></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '12px' }}>
          <div style={{ height: '16px', backgroundColor: '#334155', borderRadius: '4px', flex: 2 }}></div>
          <div style={{ height: '16px', backgroundColor: '#334155', borderRadius: '4px', flex: 3 }}></div>
          <div style={{ height: '16px', backgroundColor: '#334155', borderRadius: '4px', flex: 1.5 }}></div>
          <div style={{ height: '16px', backgroundColor: '#334155', borderRadius: '4px', flex: 1.5 }}></div>
        </div>
      ))}
    </div>
  )
}

export default ApplicantsTableSkeleton
