import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LinkAccountsDialog from './LinkAccountsDialog';

const Login = () => {
  const { 
    signInWithGoogle, 
    signInWithGithub, 
    error, 
    setError,
    pendingCredential,
    setPendingCredential
  } = useAuth();
  
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingCred, setPendingCred] = useState(null); // ✅ Fixed: removed extra bracket

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      console.error('Google sign-in error:', err);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setError(null);
      const result = await signInWithGithub();
      
      if (result && result.needsLinking) {
        // Account exists with different credential
        setPendingEmail(result.email);
        setPendingCred(result.credential);
        setShowLinkDialog(true);
      }
    } catch (err) {
      console.error('GitHub sign-in error:', err);
      // Don't show link dialog for other errors
      if (err.code !== 'auth/account-exists-with-different-credential') {
        setError(err.message);
      }
    }
  };

  const handleLinkDialogClose = () => {
    setShowLinkDialog(false);
    setPendingCredential(null);
    setPendingEmail('');
    setPendingCred(null);
  };

  return (
    <div className="login-container">
      <h2>Login to Water Refilling</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="button-group">
        <button 
          onClick={handleGoogleSignIn}
          className="btn-google"
        >
          <span className="icon">🔵</span>
          Sign in with Google
        </button>
        
        <button 
          onClick={handleGithubSignIn}
          className="btn-github"
        >
          <span className="icon">🔷</span>
          Sign in with GitHub
        </button>
      </div>

      {showLinkDialog && (
        <LinkAccountsDialog
          email={pendingEmail}
          credential={pendingCred}
          onClose={handleLinkDialogClose}
        />
      )}
    </div>
  );
};

export default Login;