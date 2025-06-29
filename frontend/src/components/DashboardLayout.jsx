import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - with responsive behavior */}
      <div className={`fixed inset-y-0 left-0 w-64 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 min-h-screen bg-gray-900">
        {/* Mobile header */}
        <div className="md:hidden bg-gray-800 px-4 py-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-white">Job Tracker</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Main content area */}
        <main className="p-4 md:p-8 lg:p-12 w-full bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 