import React, { useState, useEffect } from 'react';

const EditModal = ({ job, isOpen, onClose, onUpdate, loading }) => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    status: 'Applied',
    jobUrl: '',
    notes: ''
  });

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || '',
        company: job.company || '',
        status: job.status || 'Applied',
        jobUrl: job.jobUrl || '',
        notes: job.notes || ''
      });
    }
  }, [job]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await onUpdate(form);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-700">Edit Job</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
              required
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
              required
            />
            <input
              name="jobUrl"
              value={form.jobUrl}
              onChange={handleChange}
              placeholder="Job URL (optional)"
              type="url"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
            >
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Rejected">Rejected</option>
              <option value="Archived">Archived</option>
            </select>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes (optional)"
              rows="3"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base resize-none"
            />
            
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold text-base hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold text-base shadow hover:from-blue-700 hover:to-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal; 