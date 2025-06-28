import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden animate-gradient-x bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-blue-100/40 to-transparent pointer-events-none" />
      <div className="glass-card z-10 w-full max-w-lg p-10 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-blue-700 rounded-full p-4 shadow-lg mb-2">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <h1 className="text-5xl font-extrabold mb-2 text-blue-900 drop-shadow-lg">Job Tracker</h1>
          <p className="text-lg text-gray-700 mb-4 text-center max-w-md">Easily track your job applications, manage interviews, and stay organized in your job search journey.</p>
        </div>
        <div className="w-full flex flex-col gap-4 items-center">
          <Link
            to="/sign-in"
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="w-full flex justify-center py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Create Account
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 text-xs text-blue-900/60 z-20">&copy; {new Date().getFullYear()} Job Tracker</div>
    </div>
  );
} 