import React from 'react'


function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#232946] to-[#6A38C2] py-8 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6A38C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><polyline points="7 9 12 4 17 9"/><line x1="12" y1="4" x2="12" y2="16"/></svg>
          </span>
          <span className="text-xl font-bold text-white">Talent<span className="text-[#F83002]">Nest</span></span>
        </div>
        <p className="text-white/80 text-sm">&copy; {new Date().getFullYear()} TalentNest. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="text-white/80 hover:text-[#F83002] transition">Privacy Policy</a>
          <a href="#" className="text-white/80 hover:text-[#F83002] transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
