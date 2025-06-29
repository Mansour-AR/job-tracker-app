import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';
import AuthButtons from './AuthButtons';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
      <div className="flex-1 ml-0 md:ml-64 min-h-screen bg-gray-100">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
              <h1 className="text-lg md:text-xl font-semibold text-gray-800">Job Tracker</h1>
            </div>
            <AuthButtons />
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-4 md:p-8 lg:p-12 w-full bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 