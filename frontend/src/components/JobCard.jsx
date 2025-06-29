import React from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  LinkIcon, 
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Status color mapping function
const getStatusColor = (status) => {
  const statusColors = {
    'applied': 'bg-blue-100 text-blue-800',
    'scheduled': 'bg-green-100 text-green-800',
    'interviewed': 'bg-yellow-100 text-yellow-800',
    'rejected': 'bg-red-100 text-red-800',
    'offer': 'bg-purple-100 text-purple-800',
    'archived': 'bg-gray-100 text-gray-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

// Border color mapping for card borders
const getBorderColor = (status) => {
  const borderColors = {
    'Applied': 'border-blue-500',
    'Interview Scheduled': 'border-yellow-500',
    'Interviewed': 'border-orange-500',
    'Offer Received': 'border-green-500',
    'Rejected': 'border-red-500',
    'Archived': 'border-gray-500',
  };
  return borderColors[status] || 'border-gray-300';
};

const JobCard = ({ job, onEdit, onDelete }) => {
  const borderColor = getBorderColor(job.status);
  
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 md:p-5 flex flex-col gap-3 border-l-8 ${borderColor} transition-transform hover:scale-[1.02] hover:shadow-xl duration-200`}>
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate flex-1">{job.title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(job)}
            className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
            title="Edit job"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(job._id)}
            className="p-1 text-gray-600 hover:text-red-600 transition-colors"
            title="Delete job"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="text-gray-600 font-medium text-sm md:text-base">{job.company}</div>

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(job.status.toLowerCase().replace(/ /g, '-'))}`}>
          {job.status}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>

      {job.notes && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <div className="font-medium text-gray-600 mb-1 flex items-center">
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            Notes
          </div>
          <div className="text-gray-500 text-sm line-clamp-3">{job.notes}</div>
        </div>
      )}

      <div className="text-gray-500 text-xs mt-auto flex items-center">
        <ClockIcon className="h-3 w-3 mr-1" />
        Updated {new Date(job.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default JobCard; 