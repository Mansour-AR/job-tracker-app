import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BriefcaseIcon, PlusIcon, ListBulletIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get user info from localStorage
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    
    if (userEmail && userName) {
      setUser({ email: userEmail, name: userName });
    }
  }, []);
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Jobs', path: '/jobs', icon: 'jobs' },
    { name: 'Create Job', path: '/jobs/new', icon: 'create' },
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dashboard':
        return <BriefcaseIcon className="h-5 w-5" />;
      case 'jobs':
        return <ListBulletIcon className="h-5 w-5" />;
      case 'create':
        return <PlusIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('login_timestamp');
    
    // Navigate to welcome page
    navigate('/');
  };

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-600 text-white flex flex-col py-8 px-4 shadow-xl">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-white rounded-full p-2 mb-2 shadow-lg">
          <BriefcaseIcon className="h-8 w-8 text-blue-700" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">Job Tracker</h1>
        {user && (
          <p className="text-sm text-blue-200 mt-2 text-center">
            {user.name || user.email}
          </p>
        )}
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-800/80 hover:scale-[1.03] ${location.pathname === item.path ? 'bg-white text-blue-800 shadow font-bold' : 'bg-blue-700/0'}`}
          >
            {getIcon(item.icon)}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex-1" />
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-red-600/80 hover:scale-[1.03] bg-red-600/60 text-white mb-4"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        Log Out
      </button>
      
      <div className="text-xs text-blue-200 text-center">&copy; {new Date().getFullYear()} Job Tracker</div>
    </aside>
  );
};

export default Sidebar; 