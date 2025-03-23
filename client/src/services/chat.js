import { db, storage } from '../config/firebase';
import { ref, push, onValue, update, remove } from 'firebase/database';
import { encryptMessage } from './encryption';

export const sendMessage = async (message, userId) => {
  const encrypted = await encryptMessage(message.text);
  return push(ref(db, 'messages'), {
    ...message,
    text: encrypted,
    userId,
    timestamp: Date.now(),
    status: 'sent'
  });
};

export const editMessage = (messageId, newText) => {
  return update(ref(db, `messages/${messageId}`), {
    text: newText,
    edited: true
  });
};

export const deleteMessage = (messageId) => {
  return remove(ref(db, `messages/${messageId}`));
};

export const listenForMessages = (callback) => {
  return onValue(ref(db, 'messages'), (snapshot) => {
    const messages = [];
    snapshot.forEach((child) => {
      messages.push({ id: child.key, ...child.val() });
    });
    callback(messages);
  });
};
