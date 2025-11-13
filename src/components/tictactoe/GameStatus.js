import React from 'react';

const GameStatus = ({ gameStatus, isPlayerTurn, playerSymbol, aiSymbol, aiMood, isAiThinking }) => {
  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'won':
        return {
          emoji: '🎉',
          title: 'yay! you won!',
          message: 'you\'re so smart! 🐱✨'
        };
      case 'lost':
        return {
          emoji: '💜',
          title: 'i won this time!',
          message: 'good game though! want to try again? 😊'
        };
      case 'draw':
        return {
          emoji: '🤝',
          title: 'it\'s a tie!',
          message: 'we\'re both pretty good at this! 💕'
        };
      case 'playing':
        if (isPlayerTurn) {
          return {
            emoji: '🐱',
            title: 'your turn!',
            message: 'pick a spot to place your cute cat! 🐾'
          };
        } else {
          // Show AI personality based on mood
          if (isAiThinking) {
            return {
              emoji: '💭',
              title: 'thinking...',
              message: 'let me consider my options... 🤔'
            };
          }
          
          const moodMessages = {
            excited: {
              emoji: '🎉',
              title: 'my turn!',
              message: 'ooh, so many choices! *picks randomly* 😆'
            },
            cute: {
              emoji: '🌸',
              title: 'my turn!',
              message: 'this pattern looks so pretty! 🌸'
            },
            sleepy: {
              emoji: '😴',
              title: 'my turn!',
              message: 'yawn... what was i doing? 😴'
            },
            nice: {
              emoji: '😊',
              title: 'my turn!',
              message: 'i\'ll be nice this time! 😊'
            },
            winning: {
              emoji: '💕',
              title: 'my turn!',
              message: 'time to win! 💕'
            },
            blocking: {
              emoji: '🛡️',
              title: 'my turn!',
              message: 'better block that! 🛡️'
            },
            thinking: {
              emoji: '🤔',
              title: 'my turn!',
              message: 'let me think strategically... 🤔'
            }
          };
          
          return moodMessages[aiMood] || {
            emoji: '💜',
            title: 'my turn!',
            message: 'hmm, where should i put my heart? 💜'
          };
        }
      default:
        return {
          emoji: '🎮',
          title: 'let\'s play!',
          message: 'ready for some fun? 💕'
        };
    }
  };

  const status = getStatusMessage();

  return (
    <div className={`game-status ${gameStatus}`}>
      <div className="status-emoji">{status.emoji}</div>
      <h2 className="status-title">{status.title}</h2>
      <p className="status-message">{status.message}</p>
      
      {gameStatus === 'playing' && (
        <div className="turn-indicator">
          <div className={`player-indicator ${isPlayerTurn ? 'active' : ''}`}>
            <span className="player-symbol">{playerSymbol}</span>
            <span className="player-label">you</span>
          </div>
          <div className="vs-divider">vs</div>
          <div className={`player-indicator ${!isPlayerTurn ? 'active' : ''}`}>
            <span className="player-symbol">{aiSymbol}</span>
            <span className="player-label">me</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStatus;
