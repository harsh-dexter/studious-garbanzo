import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { auth, db } from '../config/firebase';
import { signInAnonymously } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

export default function TestScreen() {
  useEffect(() => {
    async function testFirebase() {
      try {
        // Sign in anonymously
        await signInAnonymously(auth);
        console.log('Signed in anonymously!');

        // Write a test value
        await set(ref(db, 'testNode'), { hello: 'world' });
        console.log('Test data written.');

        // Read the test value
        const snapshot = await get(ref(db, 'testNode'));
        if (snapshot.exists()) {
          console.log('Data read:', snapshot.val());
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Firebase error:', error);
      }
    }
    testFirebase();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Check your console for Firebase test results.</Text>
    </View>
  );
}
