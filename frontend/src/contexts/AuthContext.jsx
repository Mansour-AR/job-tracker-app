import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const userEmail = localStorage.getItem('user_email');
      const userName = localStorage.getItem('user_name');
      const userId = localStorage.getItem('user_id');

      if (authStatus === 'true' && userEmail) {
        setIsAuthenticated(true);
        setUser({
          email: userEmail,
          name: userName,
          user_id: userId
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem('user_id', userData.user_id);
    localStorage.setItem('user_email', userData.email);
    localStorage.setItem('user_name', userData.name);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('login_timestamp', Date.now().toString());
    
    setIsAuthenticated(true);
    setUser({
      email: userData.email,
      name: userData.name,
      user_id: userData.user_id
    });
  };

  const logout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('login_timestamp');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 