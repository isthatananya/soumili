// Firebase configuration
// Note: In a real application, you would replace these with your actual Firebase config
// For now, we're using localStorage as a fallback

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase (only if config is provided)
let app = null;
let db = null;

try {
  if (firebaseConfig.apiKey !== "your-api-key-here") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (error) {
  console.log("Firebase not configured, using localStorage fallback");
}

// Message storage functions
export const saveMessage = async (message) => {
  if (db) {
    // Use Firebase if configured
    try {
      const { addDoc, collection } = await import('firebase/firestore');
      await addDoc(collection(db, 'messages'), {
        ...message,
        timestamp: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      return false;
    }
  } else {
    // Fallback to localStorage
    try {
      const messages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
      messages.push({
        ...message,
        id: Date.now(),
        timestamp: new Date().toLocaleString()
      });
      localStorage.setItem('birthdayMessages', JSON.stringify(messages));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }
};

export const getMessages = async () => {
  if (db) {
    // Use Firebase if configured
    try {
      const { getDocs, collection, orderBy, query } = await import('firebase/firestore');
      const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(messagesQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching from Firebase:', error);
      return [];
    }
  } else {
    // Fallback to localStorage
    try {
      return JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    } catch (error) {
      console.error('Error fetching from localStorage:', error);
      return [];
    }
  }
};

export { db };
