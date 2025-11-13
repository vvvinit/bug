import { useEffect } from 'react';
import { UI_CONFIG } from '../constants';

/**
 * Custom hook for My Melody click effect
 * @param {string} imageSrc - Source of the My Melody image
 */
export const useMelodyEffect = (imageSrc) => {
  useEffect(() => {
    const handleClick = (event) => {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.position = 'absolute';
      img.style.width = UI_CONFIG.MELODY_IMAGE_SIZE;
      img.style.opacity = '0';
      img.style.transition = 'opacity 1s';
      img.style.draggable = 'false';
      img.style.pointerEvents = 'none'; // Prevent interference with other clicks
      img.style.zIndex = '1000';

      img.onload = () => {
        img.style.left = `${event.clientX - img.width / 2}px`;
        img.style.top = `${event.clientY - img.height / 2}px`;
        img.style.opacity = UI_CONFIG.MELODY_OPACITY;
      };

      document.body.appendChild(img);

      // Start fade out
      const fadeTimer = setTimeout(() => {
        img.style.opacity = '0';
      }, UI_CONFIG.MELODY_FADE_DELAY);

      // Remove element
      const removeTimer = setTimeout(() => {
        if (document.body.contains(img)) {
          document.body.removeChild(img);
        }
      }, UI_CONFIG.MELODY_REMOVE_DELAY);

      // Cleanup function for this specific image
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
        if (document.body.contains(img)) {
          document.body.removeChild(img);
        }
      };
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [imageSrc]);
};
