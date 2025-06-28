import React from 'react';
import JobCard from './JobCard';
import { PlusIcon } from '@heroicons/react/24/outline';

const JobList = ({ jobs, onEdit, onDelete }) => {
  if (!jobs.length) {
    return (
      <div className="text-center py-12">
        <PlusIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <div className="text-gray-400 text-lg italic">No jobs found. Start by adding a new job!</div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {jobs.map(job => (
        <JobCard 
          key={job._id} 
          job={job} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default JobList; 