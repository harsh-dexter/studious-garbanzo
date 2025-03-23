import { auth } from '../config/firebase';
import { signInAnonymously } from 'firebase/auth';
import { generateUsername } from '../utils/usernameGenerator';

export const anonymousLogin = async () => {
  try {
    const { user } = await signInAnonymously(auth);
    
    // Generate random username if not already set
    if (!user.displayName) {
      await updateProfile(user, {
        displayName: generateUsername()
      });
    }

    return {
      uid: user.uid,
      username: user.displayName,
      isAnonymous: user.isAnonymous
    };
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Failed to authenticate anonymously');
  }
};

export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        username: user.displayName,
        isAnonymous: user.isAnonymous
      });
    } else {
      callback(null);
    }
  });
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};
