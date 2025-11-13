import React from 'react';
import heartImage from '../../assets/images/heart-health.png';
import explodeHeartImage from '../../assets/images/explode-heart.png';

const HeartsDisplay = ({ hearts, transitioning, answeredCorrectly }) => {
  return (
    <>
      <div className="hearts">
        {Array.from({ length: hearts }, (_, index) => (
          <img 
            key={index} 
            src={heartImage} 
            alt="Heart" 
            className={`heart-icon ${transitioning && !answeredCorrectly ? 'heart-gentle-shake' : ''}`}
          />
        ))}
      </div>
      
      {/* Cute pastel heart breaking effect - positioned in puzzle center */}
      {transitioning && !answeredCorrectly && (
        <div className="heart-break-effects">
          <div className="cute-heart-break">💖</div>
          <div className="pastel-sparkles">
            <span>✨</span>
            <span>🌸</span>
            <span>💫</span>
            <span>🌟</span>
          </div>
        </div>
      )}
    </>
  );
};

export default HeartsDisplay;
