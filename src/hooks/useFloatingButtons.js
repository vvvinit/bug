import { useEffect, useRef } from 'react';
import { UI_CONFIG } from '../constants';

/**
 * Custom hook for managing floating button animations
 * @param {number} buttonCount - Number of floating buttons
 * @returns {Object} - Button refs array
 */
export const useFloatingButtons = (buttonCount = UI_CONFIG.FLOATING_BUTTONS_COUNT) => {
  const buttonRefs = useRef(Array(buttonCount).fill(null));

  useEffect(() => {
    const positions = buttonRefs.current.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    }));

    const moveButtons = () => {
      positions.forEach((position, index) => {
        const button = buttonRefs.current[index];
        if (!button) return;

        // Bounce off walls
        if (position.x + button.offsetWidth > window.innerWidth || position.x < 0) {
          position.dx = -position.dx;
        }

        if (position.y + button.offsetHeight > window.innerHeight || position.y < 0) {
          position.dy = -position.dy;
        }

        // Update position
        position.x += position.dx;
        position.y += position.dy;

        // Apply new position
        button.style.left = `${position.x}px`;
        button.style.top = `${position.y}px`;
      });
    };

    const intervalId = setInterval(moveButtons, UI_CONFIG.BUTTON_MOVE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [buttonCount]);

  return { buttonRefs };
};
