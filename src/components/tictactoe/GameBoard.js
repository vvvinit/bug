import React from 'react';

const GameBoard = ({ board, winningLine, onCellClick, gameStatus }) => {
  const renderCell = (index) => {
    const isWinningCell = winningLine && winningLine.includes(index);
    const isEmpty = board[index] === null;
    const isGameOver = gameStatus !== 'playing';
    
    return (
      <button
        key={index}
        className={`game-cell ${isWinningCell ? 'winning-cell' : ''} ${isEmpty ? 'empty-cell' : 'filled-cell'}`}
        onClick={() => onCellClick(index)}
        disabled={!isEmpty || isGameOver}
      >
        <span className="cell-content">
          {board[index]}
        </span>
        {isEmpty && !isGameOver && (
          <span className="cell-hover">🐾</span>
        )}
      </button>
    );
  };

  return (
    <div className="game-board">
      <div className="board-grid">
        {Array.from({ length: 9 }, (_, index) => renderCell(index))}
      </div>
    </div>
  );
};

export default GameBoard;
