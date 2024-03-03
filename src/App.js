import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useEffect, useState, useRef } from 'react';
import Memory from "./Memory";
import nextButtonImage from './lilac.png'; // Import the image
import myMelodyImage from './mymelo.png'; // Import the image

function App() {
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

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // New state variable
  
// Initialize an array for the refs
const buttonRefs = useRef(Array(7).fill(null));

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
      });
  }, [storage]);

  useEffect(() => {
    // Use buttonRefs.current to access the array of refs
    const positions = buttonRefs.current.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    }));
  
    const moveButton = () => {
      positions.forEach((position, index) => {
        if (buttonRefs.current[index]) {
          if (position.x + buttonRefs.current[index].offsetWidth > window.innerWidth || position.x < 0) {
            position.dx = -position.dx;
          }
  
          if (position.y + buttonRefs.current[index].offsetHeight > window.innerHeight || position.y < 0) {
            position.dy = -position.dy;
          }
  
          position.x += position.dx;
          position.y += position.dy;
  
          buttonRefs.current[index].style.left = `${position.x}px`;
          buttonRefs.current[index].style.top = `${position.y}px`;
        }
      });
    };
  
    const intervalId = setInterval(moveButton, 20); // Move the buttons every 20 milliseconds
  
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []); // Empty dependency array

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  useEffect(() => {

    const handleClick = (event) => {
      const img = document.createElement('img');
      img.src = myMelodyImage; // Use the imported image
      img.style.position = 'absolute';
      img.style.width = '15vw';
      img.style.opacity = 0; // Set initial opacity to 0
      img.style.transition = 'opacity 1s'; // Transition applies to opacity
      img.style.draggable = 'false';
      img.onload = () => {
        img.style.left = `${event.clientX - img.width / 2}px`;
        img.style.top = `${event.clientY - img.height / 2}px`;
        img.style.opacity = 0.6; // Change opacity to 0.5 after the image has loaded
      };
      document.body.appendChild(img);
    
      // Start the fade out after 3 seconds
      setTimeout(() => {
        img.style.opacity = 0;
      }, 5000);
    
      // Remove the image after 4 seconds (1 second after the fade out completes)
      setTimeout(() => {
        document.body.removeChild(img);
      }, 6000);
    };
  
    // Add the event listener to the document
    document.addEventListener('click', handleClick);
  
    // Remove the event listener in the cleanup function
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); // Empty dependency array

  return (
    <div className="App">
      {images.length > 0 && 
        <Memory 
  src={images[currentImageIndex]} 
  style={{
    opacity: 0, 
    zIndex: 2, // Add this line
    position: 'fixed', // Change this line
    top: 0, // Add this line
    left: 0, // Add this line
    width: '100%', // Add this line
    height: '100%' // Add this line
  }} 
  onLoad={e => e.target.style.opacity = 1} 
/>
}
      {buttonRefs.current.map((_, index) => (
        <button 
        key={index} 
        ref={el => buttonRefs.current[index] = el} 
        onClick={nextImage} 
        disabled={images.length === 0} 
        style={{
          background: 'transparent', 
          border: 'none', 
          cursor: 'inherit', 
          position: 'absolute',
          zIndex: 10, // Add this line
          opacity: 0.9, // Add this line
        }}
      >
        <img src={nextButtonImage} alt="Next" style={{width: '2.5vw', cursor: 'inherit'}} draggable="false" />
      </button>
      ))}
    </div>
  );
}

export default App;