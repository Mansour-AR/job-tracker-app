import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatsChart from '../components/StatsChart';
import { 
  BriefcaseIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ArchiveBoxIcon,
  DocumentTextIcon,
  ClockIcon,
  ChartBarIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { API_ENDPOINTS } from '../config/api';

const STATUS_LABELS = [
  { key: 'Applied', label: 'Applied', icon: BriefcaseIcon, color: 'text-blue-600' },
  { key: 'Interview Scheduled', label: 'Interview Scheduled', icon: CalendarIcon, color: 'text-green-600' },
  { key: 'Interviewed', label: 'Interviewed', icon: UserGroupIcon, color: 'text-amber-600' },
  { key: 'Offer Received', label: 'Offer Received', icon: CheckCircleIcon, color: 'text-purple-600' },
  { key: 'Rejected', label: 'Rejected', icon: XCircleIcon, color: 'text-red-600' },
  { key: 'Archived', label: 'Archived', icon: ArchiveBoxIcon, color: 'text-gray-600' },
];

const statusBgColors = {
  'Applied': 'bg-blue-100 text-blue-700',
  'Interview Scheduled': 'bg-yellow-100 text-yellow-700',
  'Interviewed': 'bg-orange-100 text-orange-700',
  'Offer Received': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Archived': 'bg-gray-100 text-gray-700',
};

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id');
    
    if (userEmail && userName) {
      setUser({ email: userEmail, name: userName, user_id: userId });
    }
  }, []);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    setError(null);
    try {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
      }
      
      const url = API_ENDPOINTS.getJobsWithUser(userId);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (res.status === 401) {
        const errorData = await res.json();
        setError(`Authentication failed: ${errorData.message || errorData.error}`);
        return;
      }
      
      const data = await res.json();
      
      if (res.ok) {
        setJobs(data.jobs || data);
      } else {
        setError(data.error || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError('Network error or authentication issue');
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    setStatsError(null);
    try {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        setStatsError('User ID not found. Please log in again.');
        return;
      }
      
      const url = API_ENDPOINTS.getStatsWithUser(userId);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (res.status === 401) {
        const errorData = await res.json();
        setStatsError(`Authentication failed: ${errorData.message || errorData.error}`);
        return;
      }
      
      const data = await res.json();
      
      if (res.ok) {
        setStats(data);
      } else {
        setStatsError(data.error || 'Failed to fetch stats');
      }
    } catch (err) {
      setStatsError('Network error or authentication issue');
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Loading user information...</div>
          <div className="text-sm text-gray-600">Please wait while we load your profile</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="h-full p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Dashboard</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => !['Rejected', 'Archived'].includes(job.status)).length;

  return (
    <DashboardLayout>
      <div className="h-full">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">
            <HomeIcon className="inline-block mr-2 md:mr-3 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
            Job Dashboard
          </h1>
          <p className="text-gray-700 mb-4 text-base md:text-lg">Welcome back, <span className="font-semibold">{user?.name || user?.email}</span></p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="glass-card card-effect p-4 md:p-6 flex flex-col items-center border-l-8 border-blue-400 hover:scale-105 transition-transform duration-200">
            <DocumentTextIcon className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mb-2" />
            <div className="text-2xl md:text-3xl font-extrabold text-blue-700 drop-shadow">{totalJobs}</div>
            <div className="text-gray-700 mt-2 font-semibold text-sm md:text-base">Total Jobs</div>
          </div>
          <div className="glass-card card-effect p-4 md:p-6 flex flex-col items-center border-l-8 border-green-400 hover:scale-105 transition-transform duration-200">
            <ClockIcon className="h-6 w-6 md:h-8 md:w-8 text-green-600 mb-2" />
            <div className="text-2xl md:text-3xl font-extrabold text-green-700 drop-shadow">{activeJobs}</div>
            <div className="text-gray-700 mt-2 font-semibold text-sm md:text-base">Active Applications</div>
          </div>
          <div className="glass-card card-effect p-4 md:p-6 flex flex-col items-center border-l-8 border-purple-400 hover:scale-105 transition-transform duration-200 sm:col-span-2 lg:col-span-1">
            <ChartBarIcon className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mb-2" />
            <div className="text-2xl md:text-3xl font-extrabold text-purple-700 drop-shadow">
              {totalJobs > 0 ? Math.round((activeJobs / totalJobs) * 100) : 0}%
            </div>
            <div className="text-gray-700 mt-2 font-semibold text-sm md:text-base">Success Rate</div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="glass-card card-effect p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-800">Job Status Overview</h2>
          {loadingJobs ? (
            <div className="text-gray-500 text-center py-8">Loading job statistics...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {STATUS_LABELS.map(status => {
                const count = jobs.filter(job => job.status === status.key).length;
                const percentage = totalJobs > 0 ? Math.round((count / totalJobs) * 100) : 0;
                const IconComponent = status.icon;
                
                return (
                  <div key={status.key} className="glass-card card-effect p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-5 w-5 ${status.color}`} />
                        <span className="font-semibold text-gray-800 text-sm md:text-base">{status.label}</span>
                      </div>
                      <span className="text-lg md:text-xl font-bold text-gray-900">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${status.color.replace('text-', 'bg-')}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="glass-card card-effect p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-800">Recent Activity</h2>
          {loadingJobs ? (
            <div className="text-gray-500 text-center py-8">Loading recent activity...</div>
          ) : jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.slice(0, 5).map(job => (
                <div key={job._id} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-gray-200">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm md:text-base truncate">{job.title}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusBgColors[job.status] || 'bg-gray-100 text-gray-700'}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{job.company}</div>
                  </div>
                  <div className="text-xs text-gray-500 ml-4">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No jobs yet. Start by adding your first job application!</p>
            </div>
          )}
        </div>

        {/* Stats Chart */}
        {!loadingStats && stats && (
          <div className="glass-card card-effect p-4 md:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-800">Application Trends</h2>
            <div className="w-full h-64 md:h-80">
              <StatsChart stats={stats} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 