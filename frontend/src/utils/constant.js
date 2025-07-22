// Use this for production
export const BASE_BACKEND_URL = "https://talent-nest-backend.onrender.com";
// Use this for local development
export const LOCAL_BACKEND_URL = "http://localhost:8000";

// Switch between BASE_BACKEND_URL and LOCAL_BACKEND_URL as needed
// Example: const API_BASE = process.env.NODE_ENV === 'development' ? LOCAL_BACKEND_URL : BASE_BACKEND_URL;
const API_BASE = LOCAL_BACKEND_URL; // Change to LOCAL_BACKEND_URL for local testing

export const USER_API_END_POINT = `${API_BASE}/api/v1/user`;
export const JOB_API_END_POINT = `${API_BASE}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_BASE}/api/v1/company`;
export const INTERVIEW_API_END_POINT = `${API_BASE}/api/v1/interview`;
