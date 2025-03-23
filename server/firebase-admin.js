const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path if it's in a subfolder

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://anon-chat-app-d7b33-default-rtdb.firebaseio.com"
});

module.exports = admin;
