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
        <div className="h-full overflow-y-auto p-8">
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
      <div className="h-full overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">
            <HomeIcon className="inline-block mr-3 h-10 w-10" />
            Job Dashboard
          </h1>
          <p className="text-gray-700 mb-4 text-lg">Welcome back, <span className="font-semibold">{user?.name || user?.email}</span></p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card card-effect p-6 flex flex-col items-center border-l-8 border-blue-400 hover:scale-105 transition-transform duration-200">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 mb-2" />
            <div className="text-3xl font-extrabold text-blue-700 drop-shadow">{totalJobs}</div>
            <div className="text-gray-700 mt-2 font-semibold">Total Jobs</div>
          </div>
          <div className="glass-card card-effect p-6 flex flex-col items-center border-l-8 border-green-400 hover:scale-105 transition-transform duration-200">
            <ClockIcon className="h-8 w-8 text-green-600 mb-2" />
            <div className="text-3xl font-extrabold text-green-700 drop-shadow">{activeJobs}</div>
            <div className="text-gray-700 mt-2 font-semibold">Active Applications</div>
          </div>
          <div className="glass-card card-effect p-6 flex flex-col items-center border-l-8 border-purple-400 hover:scale-105 transition-transform duration-200">
            <ChartBarIcon className="h-8 w-8 text-purple-600 mb-2" />
            <div className="text-3xl font-extrabold text-purple-700 drop-shadow">
              {totalJobs > 0 ? Math.round((activeJobs / totalJobs) * 100) : 0}%
            </div>
            <div className="text-gray-700 mt-2 font-semibold">Success Rate</div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="glass-card card-effect p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Job Status Overview</h2>
          {loadingJobs ? (
            <div className="text-gray-500 text-center py-8">Loading job statistics...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {STATUS_LABELS.map(({ key, label, icon: Icon, color }) => (
                <div key={key} className="glass-card card-effect p-4 flex flex-col items-center border-l-4 border-blue-400 hover:scale-105 transition-transform duration-200">
                  <Icon className={`h-6 w-6 ${color} mb-2`} />
                  <div className="text-2xl font-extrabold text-blue-700 drop-shadow">
                    {jobs.filter(job => job.status === key).length}
                  </div>
                  <div className="text-gray-700 mt-1 font-medium text-sm text-center">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="glass-card card-effect p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Analytics & Charts</h2>
          <StatsChart 
            stats={stats} 
            loading={loadingStats} 
            error={statsError} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
} 