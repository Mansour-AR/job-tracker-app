import React from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  LinkIcon, 
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const statusColors = {
  'Applied': 'border-blue-500',
  'Interview Scheduled': 'border-yellow-500',
  'Interviewed': 'border-orange-500',
  'Offer Received': 'border-green-500',
  'Rejected': 'border-red-500',
  'Archived': 'border-gray-500',
};

const statusBgColors = {
  'Applied': 'bg-blue-100 text-blue-700',
  'Interview Scheduled': 'bg-yellow-100 text-yellow-700',
  'Interviewed': 'bg-orange-100 text-orange-700',
  'Offer Received': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Archived': 'bg-gray-100 text-gray-700',
};

const JobCard = ({ job, onEdit, onDelete }) => {
  const borderColor = statusColors[job.status] || 'border-gray-300';
  const statusBgColor = statusBgColors[job.status] || 'bg-gray-100 text-gray-700';
  
  return (
    <div className={`bg-bg-card glass-card card-effect shadow-lg rounded-lg p-4 md:p-5 flex flex-col gap-3 border-l-8 ${borderColor} transition-transform hover:scale-[1.02] hover:shadow-xl duration-200`}> 
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-lg md:text-xl font-bold text-text-primary truncate flex-1">{job.title}</h2>
        <span className={`text-xs px-2 md:px-3 py-1 rounded-full font-semibold whitespace-nowrap flex-shrink-0 ${statusBgColor}`}>
          {job.status}
        </span>
      </div>
      <div className="text-text-secondary font-medium text-sm md:text-base">{job.company}</div>
      
      {job.jobUrl && (
        <div className="text-sm">
          <a 
            href={job.jobUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent-blue hover:text-accent-blue/80 underline truncate block flex items-center"
          >
            <LinkIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">View Job Posting →</span>
          </a>
        </div>
      )}
      
      {job.notes && (
        <div className="text-sm text-text-tertiary bg-bg-light p-3 rounded-lg">
          <div className="font-medium text-text-secondary mb-1 flex items-center">
            <DocumentTextIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            Notes:
          </div>
          <div className="text-text-tertiary text-sm line-clamp-3">{job.notes}</div>
        </div>
      )}
      
      <div className="text-text-tertiary text-xs mt-auto flex items-center">
        <CalendarIcon className="h-3 w-3 mr-1 flex-shrink-0" />
        Applied: {new Date(job.createdAt).toLocaleDateString()}
      </div>
      
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(job)}
          className="flex-1 bg-blue-50 text-blue-600 py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200 flex items-center justify-center"
        >
          <PencilIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          Edit
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="flex-1 bg-red-50 text-red-600 py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium hover:bg-red-100 transition-colors border border-red-200 flex items-center justify-center"
        >
          <TrashIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard; 