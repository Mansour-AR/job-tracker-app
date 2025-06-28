import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  ChartPieIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  CheckCircleIcon, 
  ChartBarSquareIcon 
} from '@heroicons/react/24/outline';

const COLORS = [
  '#3B82F6', // Blue - Applied
  '#10B981', // Green - Interview Scheduled
  '#F59E0B', // Amber - Interviewed
  '#8B5CF6', // Purple - Offer Received
  '#EF4444', // Red - Rejected
  '#6B7280', // Gray - Archived
];

const STATUS_LABELS = {
  'Applied': 'Applied',
  'Interview Scheduled': 'Interview Scheduled',
  'Interviewed': 'Interviewed',
  'Offer Received': 'Offer Received',
  'Rejected': 'Rejected',
  'Archived': 'Archived'
};

const StatsChart = ({ stats, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading charts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error loading stats: {error}</div>
      </div>
    );
  }

  if (!stats || !stats.statusCounts) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  // Prepare data for charts
  const chartData = Object.entries(stats.statusCounts)
    .filter(([_, count]) => count > 0) // Only show statuses with jobs
    .map(([status, count]) => ({
      name: STATUS_LABELS[status] || status,
      value: count,
      status: status
    }));

  const barData = Object.entries(stats.statusCounts).map(([status, count]) => ({
    name: STATUS_LABELS[status] || status,
    jobs: count,
    status: status
  }));

  if (chartData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-gray-500 mb-2">No jobs found</div>
          <div className="text-sm text-gray-400">Add some jobs to see your statistics</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Pie Chart */}
      <div className="glass-card card-effect p-6">
        <h3 className="text-xl font-bold mb-4 text-blue-800">
          <ChartPieIcon className="inline-block mr-2 h-5 w-5" />
          Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => label}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="glass-card card-effect p-6">
        <h3 className="text-xl font-bold mb-4 text-blue-800">
          <ChartBarIcon className="inline-block mr-2 h-5 w-5" />
          Jobs by Status
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value, name) => [value, 'Jobs']}
              labelFormatter={(label) => label}
            />
            <Bar 
              dataKey="jobs" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card card-effect p-4 text-center">
          <DocumentTextIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{stats.totalJobs}</div>
          <div className="text-sm text-gray-600">Total Jobs</div>
        </div>
        <div className="glass-card card-effect p-4 text-center">
          <CheckCircleIcon className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">
            {stats.statusCounts['Offer Received'] || 0}
          </div>
          <div className="text-sm text-gray-600">Offers Received</div>
        </div>
        <div className="glass-card card-effect p-4 text-center">
          <ChartBarSquareIcon className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">
            {stats.totalJobs > 0 
              ? Math.round(((stats.statusCounts['Offer Received'] || 0) / stats.totalJobs) * 100)
              : 0}%
          </div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
      </div>
    </div>
  );
};

export default StatsChart; 