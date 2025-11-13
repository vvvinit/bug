import React from 'react';
import cuteCatImage from '../../assets/images/cute-cat.webp';

const GameResult = ({ puzzleComplete, gameOver, onRestart }) => {
  if (gameOver && !puzzleComplete) {
    return (
      <div className="game-result-container">
        <div className="game-over-message">
          <div className="result-emoji">😿</div>
          <h2>oopsie! almost there!</h2>
          <p>don't worry, even the cutest cats need practice! 🐱</p>
          <div className="encouragement-sparkles">
            <span>✨</span>
            <span>🌸</span>
            <span>💫</span>
          </div>
          {onRestart && (
            <button onClick={onRestart} className="cute-restart-button">
              🐾 try again 🐾
            </button>
          )}
        </div>
      </div>
    );
  }

  if (puzzleComplete && !gameOver) {
    return (
      <div className="game-result-container">
        <div className="congratulations-window">
          <div className="celebration-emojis">
            <span>🎉</span>
            <span>🐱</span>
            <span>🎊</span>
          </div>
          <h2>pawsome! you're a true cat! 🐾</h2>
          <img src={cuteCatImage} alt="cute cat" className="cute-cat celebration-cat" />
          <p>meow meow! you passed the cat test with flying whiskers! ✨</p>
          <div className="victory-sparkles">
            <span>🌟</span>
            <span>💖</span>
            <span>🌸</span>
            <span>✨</span>
            <span>🎀</span>
          </div>
          {onRestart && (
            <button onClick={onRestart} className="cute-restart-button">
              🐱 play again 🐱
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default GameResult;
