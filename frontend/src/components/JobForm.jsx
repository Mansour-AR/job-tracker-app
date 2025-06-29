import React, { useState } from 'react';
import { 
  BriefcaseIcon, 
  BuildingOfficeIcon, 
  LinkIcon, 
  DocumentTextIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const JobForm = ({ onSubmit, loading, onSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    status: 'Applied',
    jobUrl: '',
    notes: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: '',
      company: '',
      status: 'Applied',
      jobUrl: '',
      notes: ''
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      resetForm();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded-xl shadow-lg flex flex-col gap-3 md:gap-4 border border-gray-100">
      <div className="flex items-center mb-2">
        <BriefcaseIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
        <h2 className="text-lg md:text-xl font-bold text-blue-700">Add New Job</h2>
      </div>
      
      <div className="relative">
        <BriefcaseIcon className="absolute left-3 top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="border border-gray-300 p-2 md:p-2.5 pl-9 md:pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base w-full"
          required
        />
      </div>
      
      <div className="relative">
        <BuildingOfficeIcon className="absolute left-3 top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="border border-gray-300 p-2 md:p-2.5 pl-9 md:pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base w-full"
          required
        />
      </div>
      
      <div className="relative">
        <LinkIcon className="absolute left-3 top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        <input
          name="jobUrl"
          value={form.jobUrl}
          onChange={handleChange}
          placeholder="Job URL (optional)"
          type="url"
          className="border border-gray-300 p-2 md:p-2.5 pl-9 md:pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base w-full"
        />
      </div>
      
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border border-gray-300 p-2 md:p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base"
      >
        <option value="Applied">Applied</option>
        <option value="Interview Scheduled">Interview Scheduled</option>
        <option value="Interviewed">Interviewed</option>
        <option value="Offer Received">Offer Received</option>
        <option value="Rejected">Rejected</option>
        <option value="Archived">Archived</option>
      </select>
      
      <div className="relative">
        <DocumentTextIcon className="absolute left-3 top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes (optional)"
          rows="3"
          className="border border-gray-300 p-2 md:p-2.5 pl-9 md:pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base resize-none w-full"
        />
      </div>
      
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base shadow hover:from-blue-700 hover:to-blue-600 transition-colors flex items-center justify-center"
        disabled={loading}
      >
        <PlusIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
        {loading ? 'Adding...' : 'Add Job'}
      </button>
    </form>
  );
};

export default JobForm; 