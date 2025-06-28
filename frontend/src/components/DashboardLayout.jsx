import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout; 