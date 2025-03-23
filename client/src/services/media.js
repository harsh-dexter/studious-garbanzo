import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadMedia = async (uri, type) => {
  const filename = `media/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const storageRef = ref(storage, filename);
  
  const response = await fetch(uri);
  const blob = await response.blob();
  
  await uploadBytes(storageRef, blob);
  return {
    url: await getDownloadURL(storageRef),
    type,
    localUri: uri
  };
};

export const deleteMedia = async (url) => {
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
};
