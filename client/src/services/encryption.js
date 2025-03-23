import * as Crypto from 'expo-crypto';

const SECRET_KEY = process.env.EXPO_PUBLIC_ENCRYPTION_KEY;

export const encryptMessage = async (text) => {
  const iv = Crypto.getRandomBytes(16);
  const cipher = await Crypto.createCipher('aes-256-gcm', SECRET_KEY, iv);
  const encrypted = await cipher.update(text, 'utf8', 'base64');
  return `${iv.toString('base64')}:${encrypted}`;
};

export const decryptMessage = async (encryptedText) => {
  const [ivString, content] = encryptedText.split(':');
  const iv = Buffer.from(ivString, 'base64');
  const decipher = await Crypto.createDecipher('aes-256-gcm', SECRET_KEY, iv);
  return await decipher.update(content, 'base64', 'utf8');
};
