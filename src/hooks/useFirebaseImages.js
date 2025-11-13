import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

/**
 * Custom hook for loading images from Firebase Storage
 * @param {string} storagePath - Path in Firebase Storage (default: root)
 * @returns {Object} - { images, loading, error }
 */
export const useFirebaseImages = (storagePath = '') => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const storageRef = ref(storage, storagePath);
        const result = await listAll(storageRef);
        
        const urlPromises = result.items.map(item => getDownloadURL(item));
        const urls = await Promise.all(urlPromises);
        
        setImages(urls);
      } catch (err) {
        console.error('Error loading images from Firebase:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [storagePath]);

  return { images, loading, error };
};
