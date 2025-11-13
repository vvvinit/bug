import React from 'react';
import { useFloatingButtons } from '../../hooks';
import { UI_CONFIG } from '../../constants';
import nextButtonImage from '../../assets/images/lilac.png';

const FloatingButtons = ({ onClick, disabled }) => {
  const { buttonRefs } = useFloatingButtons();

  return (
    <>
      {buttonRefs.current.map((_, index) => (
        <button 
          key={index} 
          ref={el => buttonRefs.current[index] = el} 
          onClick={onClick} 
          disabled={disabled} 
          className="floating-button"
          style={{
            background: 'transparent', 
            border: 'none', 
            cursor: disabled ? 'default' : 'pointer', 
            position: 'absolute',
            zIndex: 500,
            opacity: disabled ? 0.3 : UI_CONFIG.BUTTON_OPACITY,
          }}
        >
          <img 
            src={nextButtonImage} 
            alt="Next" 
            style={{
              width: '2.5vw', 
              cursor: 'inherit'
            }} 
            draggable="false" 
          />
        </button>
      ))}
    </>
  );
};

export default FloatingButtons;
