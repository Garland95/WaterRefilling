import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.displayName || user?.email}!</h1>
      
      <div className="user-info">
        {user?.photoURL && (
          <img 
            src={user.photoURL} 
            alt={user.displayName} 
            className="avatar"
          />
        )}
        <p>Email: {user?.email}</p>
        <p>UID: {user?.uid}</p>
        <p>Provider: {user?.providerData?.[0]?.providerId}</p>
      </div>
      
      <button onClick={logout} className="btn-logout">
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;