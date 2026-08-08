import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LinkAccountsDialog = ({ email, credential, onClose }) => {
  const { linkGithubAccount, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLinkWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First sign in with Google
      await signInWithGoogle();
      
      // Then link GitHub account
      await linkGithubAccount(credential);
      
      alert('Accounts linked successfully! You can now use both Google and GitHub.');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Account Already Exists</h3>
        
        <p>
          The email <strong>{email}</strong> is already registered with a different 
          login method.
        </p>
        
        <p>Would you like to link your GitHub account?</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="modal-actions">
          <button 
            onClick={handleLinkWithGoogle}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Linking...' : 'Yes, Link Accounts'}
          </button>
          
          <button 
            onClick={handleCancel}
            disabled={loading}
            className="btn-secondary"
          >
            No, Cancel
          </button>
        </div>
        
        <p className="modal-hint">
          Hint: Sign in with Google first, then we'll link your GitHub account.
        </p>
      </div>
    </div>
  );
};

export default LinkAccountsDialog;