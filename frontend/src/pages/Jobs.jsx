import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import JobList from '../components/JobList';
import JobForm from '../components/JobForm';
import EditModal from '../components/EditModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Toast from '../components/Toast';
import { 
  BriefcaseIcon, 
  DocumentTextIcon, 
  PlusIcon 
} from '@heroicons/react/24/outline';
import { API_ENDPOINTS } from '../config/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [updatingJob, setUpdatingJob] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingJob, setDeletingJob] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id');
    
    if (userEmail && userName) {
      setUser({ email: userEmail, name: userName, user_id: userId });
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

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

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobCreated = (newJob) => {
    setJobs(prev => [...prev, newJob]);
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs(prev => prev.map(job => job._id === updatedJob._id ? updatedJob : job));
  };

  const handleJobDeleted = (jobId) => {
    setJobs(prev => prev.filter(job => job._id !== jobId));
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setEditModalOpen(true);
  };

  const handleUpdateJob = async (updatedData) => {
    setUpdatingJob(true);
    try {
      const userId = localStorage.getItem('user_id');
      const response = await fetch(`${API_ENDPOINTS.getJobById(editingJob._id)}?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        handleJobUpdated(updatedJob);
        showToast(`"${updatedData.title}" updated successfully!`);
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update job');
        showToast(errorData.error || 'Failed to update job', 'error');
        return false;
      }
    } catch (err) {
      setError('Network error while updating job');
      showToast('Network error while updating job', 'error');
      return false;
    } finally {
      setUpdatingJob(false);
    }
  };

  const handleDeleteJob = (jobId) => {
    const job = jobs.find(j => j._id === jobId);
    setJobToDelete({ id: jobId, title: job?.title || 'Unknown Job' });
    setDeleteModalOpen(true);
  };

  const confirmDeleteJob = async () => {
    setDeletingJob(true);
    try {
      const userId = localStorage.getItem('user_id');
      const response = await fetch(`${API_ENDPOINTS.getJobById(jobToDelete.id)}?userId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        handleJobDeleted(jobToDelete.id);
        showToast(`"${jobToDelete.title}" deleted successfully!`);
        closeDeleteModal();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete job');
        showToast(errorData.error || 'Failed to delete job', 'error');
      }
    } catch (err) {
      setError('Network error while deleting job');
      showToast('Network error while deleting job', 'error');
    } finally {
      setDeletingJob(false);
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingJob(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setJobToDelete(null);
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading user information...</div>;
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">
          <BriefcaseIcon className="inline-block mr-3 h-10 w-10" />
          Your Jobs
        </h1>
        <p className="text-gray-700 mb-4 text-lg">Manage and track your job applications</p>
      </div>
      
      <div className="glass-card card-effect p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">
            <DocumentTextIcon className="inline-block mr-2 h-6 w-6" />
            Job Applications
          </h2>
          <div className="text-sm text-gray-600">
            Total: {jobs.length} job{jobs.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {loadingJobs ? (
          <div className="text-gray-500 text-center py-12">Loading jobs...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-12">{error}</div>
        ) : (
          <JobList 
            jobs={jobs} 
            onEdit={handleEdit}
            onDelete={handleDeleteJob}
          />
        )}
      </div>

      <EditModal
        job={editingJob}
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onUpdate={handleUpdateJob}
        loading={updatingJob}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteJob}
        jobTitle={jobToDelete?.title}
        loading={deletingJob}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={hideToast}
      />
    </DashboardLayout>
  );
}