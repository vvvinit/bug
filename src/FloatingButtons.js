import React, { useEffect, useRef } from 'react';
import nextButtonImage from './lilac.png'; // Import the image

const FloatingButtons = ({ onClick, disabled }) => {
  const buttonRefs = useRef(Array(7).fill(null));

  useEffect(() => {
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
  }, []);

  return (
    <>
      {buttonRefs.current.map((_, index) => (
        <button 
          key={index} 
          ref={el => buttonRefs.current[index] = el} 
          onClick={onClick} 
          disabled={disabled} 
          style={{
            background: 'transparent', 
            border: 'none', 
            cursor: 'inherit', 
            position: 'absolute',
            zIndex: 10,
            opacity: 0.9,
          }}
        >
          <img src={nextButtonImage} alt="Next" style={{width: '2.5vw', cursor: 'inherit'}} draggable="false" />
        </button>
      ))}
    </>
  );
};

export default FloatingButtons;
