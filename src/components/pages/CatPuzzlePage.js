import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useCatPuzzle } from '../../hooks';
import { PAGE_TITLES } from '../../constants';
import { HeartsDisplay, QuestionDisplay, GameResult, CatDisplay } from '../';

const CatPuzzlePage = () => {
  const location = useLocation();
  const [gameKey, setGameKey] = useState(Date.now());
  
  const {
    currentQuestion,
    currentQuestionIndex,
    hearts,
    showCat,
    puzzleComplete,
    gameOver,
    transitioning,
    answeredCorrectly,
    handleAnswer,
    resetGame,
  } = useCatPuzzle();

  useEffect(() => {
    document.title = PAGE_TITLES.CAT_PUZZLE;
  }, []);

  // Enhanced reset function that also updates the key
  const handleReset = useCallback(() => {
    console.log('handleReset called');
    resetGame();
    setGameKey(Date.now()); // Use timestamp for unique key
  }, [resetGame]);

  // Reset game when navigating to puzzle page
  useEffect(() => {
    handleReset();
  }, [location.key]); // Use location.key instead of pathname

  const showGameplay = !puzzleComplete && !gameOver && hearts > 0;
  const showResult = puzzleComplete || gameOver || hearts === 0;

  return (
    <div className="puzzle-page" key={gameKey}>
      <div className="puzzle-window">
        <div className="puzzle-container">
          {/* Fixed header area for hearts */}
          <div className="puzzle-header">
            {showGameplay && (
              <HeartsDisplay 
                hearts={hearts}
                transitioning={transitioning}
                answeredCorrectly={answeredCorrectly}
              />
            )}
          </div>

          {/* Main content area */}
          <div className="puzzle-content">
            {showGameplay && (
              <QuestionDisplay
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                onAnswer={handleAnswer}
                disabled={currentQuestion.answeredCorrectly || transitioning}
              />
            )}
          </div>

          {/* Fixed overlay area for cat gratification */}
          <div className="puzzle-overlay">
            <CatDisplay show={showCat} />
          </div>
        </div>
      </div>
      
      {/* Result overlay covers entire puzzle page */}
      {showResult && (
        <GameResult
          puzzleComplete={puzzleComplete}
          gameOver={gameOver}
          onRestart={handleReset}
        />
      )}
    </div>
  );
};

export default CatPuzzlePage;
