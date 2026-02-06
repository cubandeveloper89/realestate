import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUpHNISpIlXYBLPAwS2CtqcAmHtWtiIZc",
  authDomain: "realstate-94c8d.firebaseapp.com",
  projectId: "realstate-94c8d",
  storageBucket: "realstate-94c8d.firebasestorage.app",
  messagingSenderId: "903799813796",
  appId: "1:903799813796:web:803f4d509a5fee10399831",
  measurementId: "G-W1MC73BYHF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);