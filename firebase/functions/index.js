const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.autoDeleteMessages = functions.database.ref('/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const message = snapshot.val();
    
    if (message.ttl && message.ttl > 0) {
      setTimeout(async () => {
        await snapshot.ref.remove();
      }, message.ttl * 1000);
    }
  });
