import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  githubProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  linkWithPopup,
  fetchSignInMethodsForEmail
} from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingCredential, setPendingCredential] = useState(null);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with GitHub - with account linking
  const signInWithGithub = async () => {
    try {
      setError(null);
      
      try {
        const result = await signInWithPopup(auth, githubProvider);
        return result.user;
      } catch (error) {
        // Check if it's the account-exists error
        if (error.code === 'auth/account-exists-with-different-credential') {
          console.log('Account exists with different credential. Attempting to link...');
          setPendingCredential(error.credential);
          
          // Get the email from the credential
          const email = error.email;
          console.log('Email trying to sign in:', email);
          
          // Show a dialog to the user
          return { needsLinking: true, email, credential: error.credential };
        }
        throw error;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Link GitHub account to existing account
  const linkGithubAccount = async (credential) => {
    try {
      setError(null);
      
      if (!auth.currentUser) {
        throw new Error('No user is currently signed in');
      }
      
      // Link the credential to the current user
      const result = await linkWithPopup(auth.currentUser, githubProvider);
      console.log('Account linked successfully!');
      return result.user;
    } catch (error) {
      console.error('Link error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setPendingCredential(null);
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    error,
    pendingCredential,
    signInWithGoogle,
    signInWithGithub,
    linkGithubAccount,
    logout,
    setError,
    setPendingCredential
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};