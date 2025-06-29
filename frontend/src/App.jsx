import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Welcome from './pages/Welcome.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Jobs from './pages/Jobs.jsx';
import JobCreate from './pages/JobCreate.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import './App.css';

function App() {
  // Check if user is authenticated (only check localStorage)
  const isUserAuthenticated = localStorage.getItem('isAuthenticated') === 'true' && 
                             localStorage.getItem('user_email') && 
                             localStorage.getItem('user_id');

  // Normal app routing
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            isUserAuthenticated ? <Navigate to="/dashboard" replace /> : <Welcome />
          } 
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/new"
          element={
            <ProtectedRoute>
              <JobCreate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
