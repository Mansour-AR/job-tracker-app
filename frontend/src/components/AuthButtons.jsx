import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthButtons = ({ className = '' }) => {
  const navigate = useNavigate();
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' && 
                         localStorage.getItem('user_email') && 
                         localStorage.getItem('user_id');

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
    <div>
      {!isAuthenticated ? (
        <button 
          className={`${className} bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors`} 
          onClick={() => navigate('/sign-in')}
        >
          Login / Sign Up
        </button>
      ) : (
        <button 
          className={`${className} bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors`}
          onClick={handleLogout}
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default AuthButtons; 