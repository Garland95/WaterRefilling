import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  linkWithPopup,
  linkWithRedirect,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithEmailAndPassword
} from 'firebase/auth';

// Your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBS8OlTxVUfFro3wdmmPzGzmulwtdJ9sag",
  authDomain: "waterrefilling-def8c.firebaseapp.com",
  projectId: "waterrefilling-def8c",
  storageBucket: "waterrefilling-def8c.firebasestorage.app",
  messagingSenderId: "571467062640",
  appId: "1:571467062640:web:b37d2bb5dceb42ea4e43b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Optional: Add scopes for additional access
// googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
// githubProvider.addScope('read:user');

export { 
  auth, 
  googleProvider, 
  githubProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  linkWithPopup,
  linkWithRedirect,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithEmailAndPassword
};