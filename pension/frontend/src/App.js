import React, { useState } from 'react';
import Header from './Header';
import UserDashboard from './UserDashboard';
import EmployerDashboard from './EmployerDashboard';
import AdminDashboard from './AdminDashboard';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (error) => {
    console.error('An error occurred:', error);
    setError(error.message || 'An unexpected error occurred');
    setLoading(false);
  };

  const clearError = () => setError(null);

  return (
    <ErrorBoundary>
      <div className="app">
        <Header userType={userType} setUserType={setUserType} />
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={clearError}>Dismiss</button>
          </div>
        )}
        {loading && <div className="loading-overlay"><div className="loading"></div></div>}
        {userType === 'user' && (
          <UserDashboard setLoading={setLoading} handleError={handleError} />
        )}
        {userType === 'employer' && (
          <EmployerDashboard setLoading={setLoading} handleError={handleError} />
        )}
        {userType === 'admin' && (
          <AdminDashboard setLoading={setLoading} handleError={handleError} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
