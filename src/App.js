import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from './constants';
import { Navigation, HomePage, CatPuzzlePage, ArtworkGalleryPage } from './components';
import './styles/App.css';
import './styles/components.css';
import './styles/puzzle.css';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <div className="App">
      {/* Only show navigation if not on home page */}
      {!isHomePage && <Navigation />}
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CAT_PUZZLE} element={<CatPuzzlePage />} />
        <Route path={ROUTES.ARTWORK_GALLERY} element={<ArtworkGalleryPage />} />
        {/* Catch-all route - redirect any invalid path to homepage */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
