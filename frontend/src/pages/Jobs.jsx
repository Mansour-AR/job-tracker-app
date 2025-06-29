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
import { Link } from 'react-router-dom';

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
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">
          <BriefcaseIcon className="inline-block mr-2 md:mr-3 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
          Your Jobs
        </h1>
        <p className="text-gray-700 mb-4 text-base md:text-lg">Manage and track your job applications</p>
      </div>
      
      <div className="glass-card card-effect p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-blue-800">
            <DocumentTextIcon className="inline-block mr-2 h-5 w-5 md:h-6 md:w-6" />
            Job Applications
          </h2>
          <Link
            to="/jobs/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base"
          >
            <PlusIcon className="h-4 w-4 md:h-5 md:w-5" />
            Add New Job
          </Link>
        </div>
        
        {loadingJobs ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your jobs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Jobs</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchJobs}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
            >
              Retry
            </button>
          </div>
        ) : (
          <JobList 
            jobs={jobs} 
            onEdit={handleEdit}
            onDelete={handleDeleteJob}
          />
        )}
      </div>

      {/* Modals */}
      {editModalOpen && editingJob && (
        <EditModal
          job={editingJob}
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onUpdate={handleUpdateJob}
          updating={updatingJob}
        />
      )}

      {deleteModalOpen && jobToDelete && (
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteJob}
          jobTitle={jobToDelete.title}
          deleting={deletingJob}
        />
      )}

      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </DashboardLayout>
  );
}