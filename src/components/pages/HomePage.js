import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, NAV_LABELS, PAGE_TITLES } from '../../constants';

const HomePage = () => {
  useEffect(() => {
    document.title = PAGE_TITLES.HOME;
  }, []);

  return (
    <div className="home-page">
      <div className="home-content">
        <h1>welcome to bug! 🐱</h1>
        <p>a cute surprise made with love</p>
        
        <div className="home-navigation">
          <Link to={ROUTES.CAT_PUZZLE} className="home-link">
            <div className="home-card">
              <h3>{NAV_LABELS.CAT_PUZZLE}</h3>
              <p>test if you're really a cat! 🐾</p>
            </div>
          </Link>
          
          <Link to={ROUTES.ARTWORK_GALLERY} className="home-link">
            <div className="home-card">
              <h3>{NAV_LABELS.ARTWORK_GALLERY}</h3>
              <p>browse beautiful artwork 🎨</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
