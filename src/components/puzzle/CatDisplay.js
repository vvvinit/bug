import React from 'react';
import cuteCatImage from '../../assets/images/cute-cat.webp';

const CatDisplay = ({ show }) => {
  if (!show) return null;

  return (
    <img 
      src={cuteCatImage} 
      alt="Cute Cat" 
      className="cute-cat" 
    />
  );
};

export default CatDisplay;
