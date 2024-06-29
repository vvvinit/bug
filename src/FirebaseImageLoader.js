import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDBRcA1j9VEJ-UwCDzNdYTG5840RKfyKbs",
  authDomain: "bug-latte.firebaseapp.com",
  projectId: "bug-latte",
  storageBucket: "bug-latte.appspot.com",
  messagingSenderId: "570781289886",
  appId: "1:570781289886:web:dcfe54c2c17b59fbe29a8f"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const FirebaseImageLoader = ({ setImages }) => {
  useEffect(() => {
    const storageRef = ref(storage, '');
    listAll(storageRef)
      .then((res) => {
        const promises = res.items.map(item => getDownloadURL(item));
        Promise.all(promises)
          .then((urls) => {
            setImages(urls);
          })
      })
      .catch((error) => {
        console.error(error);
      });
  }, [storage, setImages]);

  return null;
};

export default FirebaseImageLoader;
