import React, { useEffect, useState } from 'react';
import { useFirebaseImages, useMelodyEffect } from '../../hooks';
import { PAGE_TITLES } from '../../constants';
import { ImageDisplay, FloatingButtons, LoadingSpinner, ErrorMessage } from '../';
import myMelodyImage from '../../assets/images/mymelo.png';

const ArtworkGalleryPage = () => {
  const { images, loading, error } = useFirebaseImages();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextImageLoaded, setNextImageLoaded] = useState(false);
  const [showNextImage, setShowNextImage] = useState(false);
  
  // Add My Melody click effect
  useMelodyEffect(myMelodyImage);

  useEffect(() => {
    document.title = PAGE_TITLES.ARTWORK_GALLERY;
  }, []);

  const nextImage = () => {
    if (images.length > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setNextImageLoaded(false);
      setShowNextImage(false);
      
      // Calculate next image index
      const nextIndex = (currentImageIndex + 1) % images.length;
      setNextImageIndex(nextIndex);
    }
  };

  const handleNextImageLoad = () => {
    setNextImageLoaded(true);
    
    // Once next image is loaded, start the crossfade
    setTimeout(() => {
      setShowNextImage(true);
      
      // Complete the transition after crossfade - update everything at once
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setIsTransitioning(false);
        setShowNextImage(false);
        setNextImageLoaded(false);
      }, 650); // Slightly longer than CSS transition to ensure it's complete
    }, 50);
  };

  if (loading) {
    return (
      <div className="cute-and-pretty-artwork-page">
        <LoadingSpinner message="Loading beautiful artwork..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="cute-and-pretty-artwork-page">
        <ErrorMessage 
          message={`Failed to load artwork: ${error}`}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="cute-and-pretty-artwork-page">
        <div className="no-images-message">
          <h2>No artwork found</h2>
          <p>The gallery appears to be empty. Check back later! 🎨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cute-and-pretty-artwork-page">
      {/* Only show content when images are loaded */}
      {images.length > 0 && (
        <>
          <div className="image-container">
            {/* Current image */}
            <ImageDisplay
              key={`current-${currentImageIndex}`}
              src={images[currentImageIndex]}
              className={`Memory current-image ${showNextImage ? 'fade-out' : 'visible'}`}
            />
            
            {/* Next image (preloaded and overlaid) */}
            {isTransitioning && (
              <ImageDisplay
                key={`next-${nextImageIndex}`}
                src={images[nextImageIndex]}
                className={`Memory next-image ${showNextImage ? 'fade-in' : 'hidden'}`}
                onLoad={handleNextImageLoad}
              />
            )}
          </div>
          <FloatingButtons 
            onClick={nextImage} 
            disabled={images.length === 0 || isTransitioning} 
          />
        </>
      )}
      
      {/* Show loading state */}
      {images.length === 0 && !loading && !error && (
        <div className="artwork-loading">
          <div className="pastel-loader">🌸</div>
          <p>Preparing beautiful artwork...</p>
        </div>
      )}
    </div>
  );
};

export default ArtworkGalleryPage;
