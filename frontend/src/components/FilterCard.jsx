import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFilters } from '@/redux/jobSlice'
import { X, Check } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabadad", "Mumbai", "Pune"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-42k", "42-1lakh", "1lakh to 5 lakh"]
    },
]

function FilterCard() {
    const dispatch = useDispatch();
    const selectedFilters = useSelector(store => store.job.selectedFilters) || { Location: [], Industry: [], Salary: [] };

    const toggleFilter = (category, value) => {
        const currentCategoryFilters = selectedFilters[category] || [];
        let newCategoryFilters;

        if (currentCategoryFilters.includes(value)) {
            newCategoryFilters = currentCategoryFilters.filter(item => item !== value);
        } else {
            newCategoryFilters = [...currentCategoryFilters, value];
        }

        dispatch(setSelectedFilters({
            ...selectedFilters,
            [category]: newCategoryFilters
        }));
    }

    const resetFilters = () => {
        dispatch(setSelectedFilters({ Location: [], Industry: [], Salary: [] }));
    }

    const hasAnyFilter = Object.values(selectedFilters).some(arr => arr.length > 0);

    return (
        <div style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '20px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ color: '#F8FAFC', fontWeight: '600', fontSize: '14px', margin: 0 }}>
                    Filters
                </h3>
                {hasAnyFilter && (
                    <button
                        onClick={resetFilters}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: 'rgba(239,68,68,0.1)',
                            color: '#F87171',
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        <X size={12} /> Reset
                    </button>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filterData.map((data) => {
                    const categorySelected = selectedFilters[data.filterType] || [];
                    return (
                        <div key={data.filterType}>
                            <h4 style={{
                                color: '#94A3B8',
                                fontSize: '11px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                marginBottom: '10px',
                                margin: '0 0 10px',
                            }}>
                                {data.filterType}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {data.array.map((item) => {
                                    const isChecked = categorySelected.includes(item);
                                    return (
                                        <label
                                            key={item}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                backgroundColor: isChecked ? 'rgba(37,99,235,0.1)' : 'transparent',
                                                border: isChecked ? '1px solid rgba(37,99,235,0.3)' : '1px solid transparent',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s',
                                                userSelect: 'none',
                                            }}
                                            onMouseEnter={e => {
                                                if (!isChecked) {
                                                    e.currentTarget.style.backgroundColor = '#2D3748';
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (!isChecked) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }
                                            }}
                                        >
                                            {/* Accessible hidden native checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => toggleFilter(data.filterType, item)}
                                                style={{
                                                    position: 'absolute',
                                                    opacity: 0,
                                                    width: 0,
                                                    height: 0,
                                                }}
                                            />
                                            {/* Custom styled checkbox box */}
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '4px',
                                                border: isChecked ? '1.5px solid #2563EB' : '1.5px solid #475569',
                                                backgroundColor: isChecked ? '#2563EB' : 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.1s',
                                                flexShrink: 0,
                                            }}>
                                                {isChecked && <Check size={12} color="#ffffff" strokeWidth={3} />}
                                            </div>
                                            <span style={{
                                                color: isChecked ? '#60A5FA' : '#94A3B8',
                                                fontSize: '13px',
                                                fontWeight: isChecked ? '500' : '400',
                                            }}>
                                                {item}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default FilterCard
