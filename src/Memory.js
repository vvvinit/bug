import React from 'react'
import { useState } from 'react';
import './Memory.css'; // Import the CSS file

function Memory({ src }) {
    const [loading, setLoading] = useState(true);
  
    const handleLoad = () => {
      setLoading(false);
    };
  
    return (
        <img 
            className="Memory"
            alt=""
            draggable="false"
            src={src} 
            onLoad={handleLoad} 
            style={{ 
            opacity: loading ? 0 : 1, 
            transition: 'opacity 1s ease-in-out' 
            }} 
      />
    );
}
  
export default Memory