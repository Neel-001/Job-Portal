import React from 'react'

function ProfileSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{
        backgroundColor: '#0F172A',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ height: '64px', width: '64px', backgroundColor: '#334155', borderRadius: '50%' }}></div>
        <div style={{ height: '20px', backgroundColor: '#334155', borderRadius: '4px', width: '150px' }}></div>
        <div style={{ height: '14px', backgroundColor: '#334155', borderRadius: '4px', width: '200px' }}></div>
        <div style={{ height: '14px', backgroundColor: '#334155', borderRadius: '4px', width: '120px' }}></div>
      </div>
    </div>
  )
}

export default ProfileSkeleton
