const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Adjust path if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://anon-chat-app-d7b33-default-rtdb.firebaseio.com"
});

module.exports = admin;
