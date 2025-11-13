import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, NAV_LABELS } from '../../constants';

const Navigation = () => {
  return (
    <header className="App-header">
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.HOME}>🏠 home</Link>
          </li>
          <li>
            <Link to={ROUTES.CAT_PUZZLE}>{NAV_LABELS.CAT_PUZZLE}</Link>
          </li>
          <li>
            <Link to={ROUTES.ARTWORK_GALLERY}>{NAV_LABELS.ARTWORK_GALLERY}</Link>
          </li>
          <li>
            <Link to={ROUTES.TIC_TAC_TOE}>{NAV_LABELS.TIC_TAC_TOE}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
