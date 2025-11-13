import React, { useEffect } from 'react';
import { useTicTacToe } from '../../hooks/useTicTacToe';
import { PAGE_TITLES } from '../../constants';
import { GameBoard, GameStatus } from '../tictactoe';

const TicTacToePage = () => {
  const {
    board,
    isPlayerTurn,
    gameStatus,
    playerSymbol,
    aiSymbol,
    winningLine,
    aiMood,
    isAiThinking,
    makeMove,
    resetGame
  } = useTicTacToe();

  useEffect(() => {
    document.title = PAGE_TITLES.TIC_TAC_TOE;
  }, []);

  return (
    <div className="tictactoe-page">
      <div className="tictactoe-container">
        <div className="game-header">
          <h1>let's play tic-tac-toe! 🎮</h1>
          <p>you are 🐱 and i am 💜</p>
        </div>

        <GameStatus 
          gameStatus={gameStatus}
          isPlayerTurn={isPlayerTurn}
          playerSymbol={playerSymbol}
          aiSymbol={aiSymbol}
          aiMood={aiMood}
          isAiThinking={isAiThinking}
        />

        <GameBoard 
          board={board}
          winningLine={winningLine}
          onCellClick={makeMove}
          gameStatus={gameStatus}
        />

        <div className="game-controls">
          <button 
            onClick={resetGame} 
            className="cute-reset-button"
          >
            🎮 play again 🎮
          </button>
        </div>

        <div className="game-tips">
          <p>💡 tip: i'm pretty smart, but you can still beat me! 🐱</p>
        </div>
      </div>
    </div>
  );
};

export default TicTacToePage;
