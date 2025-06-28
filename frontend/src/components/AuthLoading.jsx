import React from 'react';

const AuthLoading = ({ message = "Redirecting to secure login...", isSignup = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Loading Animation */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full p-3 w-16 h-16 mx-auto mb-4 shadow-lg animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
        </div>

        {/* Loading Card */}
        <div className="glass-card card-effect p-8 shadow-xl">
          <div className="flex flex-col items-center space-y-4">
            {/* Spinner */}
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            
            {/* Message */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                {isSignup ? 'Creating Your Account' : 'Signing You In'}
              </h2>
              <p className="text-gray-600">{message}</p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            
            {/* Security Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 w-full">
              <div className="flex items-center text-sm text-blue-700">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>
                  {isSignup 
                    ? 'Your account is being created securely with Auth0'
                    : 'Your credentials are being verified securely with Auth0'
                  }
                </span>
              </div>
            </div>

            {/* What's happening */}
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>✓ Your information has been collected</p>
              <p>✓ Redirecting to secure authentication</p>
              <p>⏳ {isSignup ? 'Creating your account' : 'Verifying your credentials'}</p>
              <p>⏳ Redirecting back to Job Tracker</p>
            </div>
          </div>
        </div>
        
        {/* Tips */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            This process is handled by Auth0, a trusted authentication provider used by thousands of applications
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLoading; 