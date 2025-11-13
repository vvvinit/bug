import React, { useState } from 'react';

const ImageDisplay = ({ src, className = '', style = {}, onLoad }) => {
  const [loading, setLoading] = useState(true);
  const isMemoryClass = className.includes('Memory');

  const handleLoad = (event) => {
    setLoading(false);
    if (onLoad) {
      onLoad(event);
    }
  };

  // Don't override CSS transitions for Memory class
  const imageStyle = isMemoryClass 
    ? { ...style }
    : { 
        opacity: loading ? 0 : 1, 
        transition: 'opacity 1s ease-in-out',
        ...style
      };

  return (
    <img 
      className={`image-display ${className}`}
      alt="Artwork"
      draggable="false"
      src={src} 
      onLoad={handleLoad} 
      style={imageStyle} 
    />
  );
};

export default ImageDisplay;
