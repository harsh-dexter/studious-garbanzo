import { initializeApp, getApps } from 'firebase-admin/app';

const firebaseConfig = {
  credential: applicationDefault(),
  databaseURL: "YOUR_DATABASE_URL"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export { getDatabase } from 'firebase-admin/database';
