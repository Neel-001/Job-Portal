import React from 'react'

function CompanySetupSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{
        backgroundColor: '#0F172A',
        minHeight: '100vh',
        padding: '32px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ height: '24px', backgroundColor: '#334155', borderRadius: '4px', width: '40%' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ height: '36px', backgroundColor: '#334155', borderRadius: '6px' }}></div>
          ))}
        </div>
        <div style={{ height: '40px', backgroundColor: '#334155', borderRadius: '6px', width: '100%', marginTop: '24px' }}></div>
      </div>
    </div>
  )
}

export default CompanySetupSkeleton
