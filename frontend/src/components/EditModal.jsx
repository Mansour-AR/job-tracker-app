import React, { useState, useEffect } from 'react';
import API_ENDPOINTS from '../config/api.js';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const EditModal = ({ job, isOpen, onClose, onUpdate, loading }) => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    status: 'Applied',
    jobUrl: '',
    notes: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [resumeUrl, setResumeUrl] = useState(job?.resumeUrl || "");

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || '',
        company: job.company || '',
        status: job.status || 'Applied',
        jobUrl: job.jobUrl || '',
        notes: job.notes || ''
      });
      setResumeUrl(job.resumeUrl || "");
      setResumeFile(null);
      setResumeError("");
      setUploadStatus("");
    }
  }, [job]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (file && !["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      setResumeError("Only PDF or DOC/DOCX files are allowed.");
      setResumeFile(null);
      setResumeUrl(job.resumeUrl || "");
      return;
    }
    setResumeError("");
    setResumeFile(file);
    setUploadStatus("Uploading...");
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const res = await fetch(API_ENDPOINTS.UPLOAD_RESUME, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setResumeUrl(data.url);
        setUploadStatus("Upload successful");
      } else {
        setResumeUrl(job.resumeUrl || "");
        setUploadStatus("");
        setResumeError(data.error || "Upload failed");
      }
    } catch (err) {
      setResumeUrl(job.resumeUrl || "");
      setUploadStatus("");
      setResumeError("Upload failed");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedJob = { ...form };
    if (resumeUrl) updatedJob.resumeUrl = resumeUrl;
    const success = await onUpdate(updatedJob);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm md:max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold text-blue-700">Edit Job</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl md:text-2xl font-bold transition-colors p-1"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="border border-gray-300 p-2 md:p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base"
              required
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
              className="border border-gray-300 p-2 md:p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base"
              required
            />
            <input
              name="jobUrl"
              value={form.jobUrl}
              onChange={handleChange}
              placeholder="Job URL (optional)"
              type="url"
              className="border border-gray-300 p-2 md:p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base"
            />
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
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes (optional)"
              rows="3"
              className="border border-gray-300 p-2 md:p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base resize-none"
            />
            
            {/* Resume upload field */}
            <div className="mb-2">
              <label htmlFor="edit-resume" className="block text-sm font-medium text-gray-700">Resume (PDF/DOCX)</label>
              <div className="relative">
                <DocumentTextIcon className="absolute left-3 top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <input
                  type="text"
                  readOnly
                  value={resumeFile ? resumeFile.name : resumeUrl ? resumeUrl.split('/').pop() : ''}
                  placeholder="Upload your resume..."
                  className="border border-gray-300 p-2 md:p-2.5 pl-9 md:pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base w-full cursor-pointer bg-white"
                  onClick={() => document.getElementById('edit-resume').click()}
                />
                <input
                  type="file"
                  id="edit-resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </div>
              {resumeError && <p className="text-red-500 text-xs mt-1">{resumeError}</p>}
              {uploadStatus && <p className="text-green-500 text-xs mt-1">{uploadStatus}</p>}
            </div>
            
            <div className="flex gap-2 md:gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base shadow hover:from-blue-700 hover:to-blue-600 transition-colors"
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