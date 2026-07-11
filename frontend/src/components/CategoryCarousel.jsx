import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "Product Manager",
]

function CategoryCarousel() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <section style={{
            backgroundColor: '#0F172A',
            padding: '64px 24px',
            borderBottom: '1px solid #1E293B',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#F8FAFC',
                        letterSpacing: '-0.02em',
                        marginBottom: '8px',
                    }}>
                        Browse by Category
                    </h2>
                    <p style={{ color: '#64748B', fontSize: '15px' }}>
                        Explore opportunities across different industries and roles
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
                    {category.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => searchJobHandler(cat)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#1E293B',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: '#94A3B8',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = 'rgba(37,99,235,0.1)';
                                e.currentTarget.style.borderColor = '#2563EB';
                                e.currentTarget.style.color = '#60A5FA';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#1E293B';
                                e.currentTarget.style.borderColor = '#334155';
                                e.currentTarget.style.color = '#94A3B8';
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoryCarousel
