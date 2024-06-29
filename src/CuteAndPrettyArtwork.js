import React, { useEffect, useState } from 'react';
import Memory from "./Memory";
import FloatingButtons from './FloatingButtons';
import FirebaseImageLoader from './FirebaseImageLoader';
import myMelodyImage from './mymelo.png'; // Import the image
import './App.css'; // Ensure this file is imported to apply the CSS

function CuteAndPrettyArtwork() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  useEffect(() => {
    document.title = 'Happy pride month!!! :3'; // Set your desired title here
  }, []);

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
        img.style.opacity = 0.6; // Change opacity to 0.6 after the image has loaded
      };
      document.body.appendChild(img);

      // Start the fade out after 5 seconds
      setTimeout(() => {
        img.style.opacity = 0;
      }, 5000);

      // Remove the image after 6 seconds (1 second after the fade out completes)
      setTimeout(() => {
        document.body.removeChild(img);
      }, 6000);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="cute-and-pretty-artwork-page">
      <FirebaseImageLoader setImages={setImages} />
      {images.length > 0 && 
        <Memory 
          src={images[currentImageIndex]} 
          style={{
            opacity: 0, 
            zIndex: 2,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }} 
          onLoad={e => e.target.style.opacity = 1} 
        />
      }
      <FloatingButtons onClick={nextImage} disabled={images.length === 0} />
    </div>
  );
}

export default CuteAndPrettyArtwork;
