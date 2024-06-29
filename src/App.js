import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import CatPuzzle from './CatPuzzle';
import CuteAndPrettyArtwork from './CuteAndPrettyArtwork';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header />} /> {/* Always render Header */}
          <Route path="/" element={<Home />} />
          <Route path="/solve-me-if-you-are-a-cat" element={<CatPuzzle />} />
          <Route path="/cute-and-pretty-artwork" element={<CuteAndPrettyArtwork />} />
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  return (
    <header className="App-header">
      <nav>
        <ul>
          <li><Link to="/solve-me-if-you-are-a-cat">bug puzzle</Link></li>
          <li><Link to="/cute-and-pretty-artwork">cute art</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default App;
