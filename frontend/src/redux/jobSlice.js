import {createSlice} from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name:'job',
    initialState:{
        allJobs : [],
        singleJob : null,
        allAdminJobs : [],
        searchJobByText : "",
        allAppliedJobs : [],
        searchedQuery : "",
        filteredJobs : [],
    },
    reducers:{
        setAllJobs : (state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob : (state,action)=>{
            state.singleJob = action.payload;
        },
        setAllAdminJobs : (state,action)=>{
            state.allAdminJobs = action.payload;
        },
        setsearchJobByText : (state,action)=>{
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs : (state,action)=>{
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery : (state,action)=>{
            state.searchedQuery = action.payload;
        },
        setFilteredJobs : (state, action) => {
            state.filteredJobs = action.payload;
        }
    }
})

export const { setAllJobs, setSingleJob, setAllAdminJobs, setsearchJobByText, setAllAppliedJobs, setSearchedQuery, setFilteredJobs } = jobSlice.actions;
export default jobSlice.reducer;