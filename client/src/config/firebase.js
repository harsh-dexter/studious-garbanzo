import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBpYAXtHQmiXacUl7zsb9D418E5aBcIcrw",
  authDomain: "anon-chat-app-d7b33.firebaseapp.com",
  databaseURL: "https://anon-chat-app-d7b33-default-rtdb.firebaseio.com",
  projectId: "anon-chat-app-d7b33",
  storageBucket: "anon-chat-app-d7b33.appspot.com",
  messagingSenderId: "186704437505",
  appId: "1:186704437505:android:885195aea184482838fb00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
