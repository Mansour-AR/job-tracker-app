// API Configuration
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  
  // Jobs endpoints
  JOBS: `${API_BASE_URL}/jobs`,
  JOB_STATS: `${API_BASE_URL}/jobs/stats`,
  
  // Helper function to get job by ID
  getJobById: (jobId) => `${API_BASE_URL}/jobs/${jobId}`,
  
  // Helper function to get jobs with user ID
  getJobsWithUser: (userId) => `${API_BASE_URL}/jobs?userId=${userId}`,
  
  // Helper function to get stats with user ID
  getStatsWithUser: (userId) => `${API_BASE_URL}/jobs/stats?userId=${userId}`,
  
  // Resume upload endpoint
  UPLOAD_RESUME: `${API_BASE_URL}/jobs/upload-resume`,
};

export default API_ENDPOINTS; 