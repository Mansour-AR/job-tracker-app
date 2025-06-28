import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import JobForm from '../components/JobForm';
import Toast from '../components/Toast';
import { 
  PlusIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
import { API_ENDPOINTS } from '../config/api';

const STATUS_OPTIONS = [
  'Applied',
  'Interview Scheduled',
  'Interviewed',
  'Offer Received',
  'Rejected',
  'Archived',
];

export default function JobCreate() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const handleSubmit = async (form) => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        setError('User ID not found. Please log in again.');
        showToast('User ID not found. Please log in again.', 'error');
        return false;
      }
      
      const res = await fetch(API_ENDPOINTS.JOBS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          userId: userId
        }),
      });
      
      if (res.status === 401) {
        setError('Authentication failed. Please sign in again.');
        showToast('Authentication failed. Please sign in again.', 'error');
        return false;
      }
      
      const data = await res.json();
      if (res.ok) {
        setMessage('Job application created successfully!');
        showToast(`"${form.title}" created successfully!`);
        setTimeout(() => navigate('/jobs'), 2000);
        return true;
      } else {
        setError(data.error || 'Failed to create job application');
        showToast(data.error || 'Failed to create job application', 'error');
        return false;
      }
    } catch (err) {
      setError('Network error or authentication issue');
      showToast('Network error or authentication issue', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setMessage('Job application created successfully!');
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">
          <PlusIcon className="inline-block mr-3 h-10 w-10" />
          Add New Job
        </h1>
        <p className="text-gray-700 mb-4 text-lg">Create a new job application to track</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="glass-card card-effect p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">
            <DocumentTextIcon className="inline-block mr-2 h-6 w-6" />
            Job Application Form
          </h2>
          <JobForm onSubmit={handleSubmit} loading={loading} onSuccess={handleSuccess} />
          {message && <div className="mt-3 text-green-600 text-center font-medium text-sm">{message}</div>}
          {error && <div className="mt-3 text-red-600 text-center text-sm">{error}</div>}
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={hideToast}
      />
    </DashboardLayout>
  );
} 