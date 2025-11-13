import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing tic-tac-toe game state
 * @returns {Object} - Game state and actions
 */
export const useTicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost', 'draw'
  const [playerSymbol] = useState('🐱'); // Player is always cute cat
  const [aiSymbol] = useState('💜'); // AI is heart
  const [winningLine, setWinningLine] = useState(null);
  const [aiMood, setAiMood] = useState('thinking'); // 'thinking', 'excited', 'sleepy', 'nice', 'cute'
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  // Check for winner
  const checkWinner = useCallback((currentBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combination };
      }
    }
    return null;
  }, [winningCombinations]);

  // Check if board is full
  const isBoardFull = useCallback((currentBoard) => {
    return currentBoard.every(cell => cell !== null);
  }, []);

  // Get available moves
  const getAvailableMoves = useCallback((currentBoard) => {
    return currentBoard.map((cell, index) => cell === null ? index : null)
      .filter(val => val !== null);
  }, []);

  // Minimax algorithm for AI
  const minimax = useCallback((currentBoard, depth, isMaximizing) => {
    const result = checkWinner(currentBoard);

    if (result) {
      if (result.winner === aiSymbol) return 10 - depth;
      if (result.winner === playerSymbol) return depth - 10;
    }

    if (isBoardFull(currentBoard)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = aiSymbol;
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = playerSymbol;
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }, [checkWinner, isBoardFull, aiSymbol, playerSymbol]);

  // AI Personality traits (more balanced)
  const aiPersonality = {
    // Sometimes the AI gets distracted by "cute patterns"
    likesCutePatterns: () => Math.random() < 0.08, // 8% chance

    // Sometimes the AI is "sleepy" and misses obvious moves
    isSleepy: () => Math.random() < 0.08, // 6% chance

    // Sometimes the AI wants to be "nice" and not block you
    feelsNice: () => Math.random() < 0.08, // 4% chance

    // Sometimes the AI gets "excited" and makes a random move
    getsExcited: () => Math.random() < 0.08, // 5% chance
  };

  // Get cute pattern moves (AI likes symmetry and corners)
  const getCutePatternMove = useCallback((currentBoard) => {
    const availableMoves = getAvailableMoves(currentBoard);

    // Prefer corners for "cute symmetry"
    const corners = [0, 2, 6, 8].filter(i => availableMoves.includes(i));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Otherwise pick center if available
    if (availableMoves.includes(4)) return 4;

    // Random move as fallback
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }, [getAvailableMoves]);

  // Get best AI move with personality
  const getBestMove = useCallback((currentBoard) => {
    const availableMoves = getAvailableMoves(currentBoard);
    
    // Calculate personality once per turn (not multiple times!)
    const personalityRolls = {
      excited: Math.random() < 0.08,
      cute: Math.random() < 0.08, 
      sleepy: Math.random() < 0.08,
      nice: Math.random() < 0.08
    };
    
    console.log('🎲 Personality rolls:', personalityRolls);

    // Check if AI can win (always prioritize winning)
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = aiSymbol;
        if (checkWinner(currentBoard)) {
          currentBoard[i] = null;
          setAiMood('winning');
          console.log('💜 AI: "Time to win! 💕"');
          return i;
        }
        currentBoard[i] = null;
      }
    }

    // Check if player can win and needs blocking
    const playerThreats = [];
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = playerSymbol;
        if (checkWinner(currentBoard)) {
          playerThreats.push(i);
        }
        currentBoard[i] = null;
      }
    }

    console.log('⚠️ Player threats found:', playerThreats.length);

    // AI Personality Check: Sometimes is sleepy and misses threats
    if (playerThreats.length > 0 && personalityRolls.sleepy) {
      setAiMood('sleepy');
      console.log('💜 AI: "Yawn... what was I doing? 😴" (SLEEPY TRIGGERED!)');
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // AI Personality Check: Sometimes feels nice and doesn't block
    if (playerThreats.length > 0 && personalityRolls.nice) {
      setAiMood('nice');
      console.log('💜 AI: "I\'ll be nice this time! 😊" (NICE TRIGGERED!)');
      // Pick a random non-blocking move
      const nonBlockingMoves = availableMoves.filter(move => !playerThreats.includes(move));
      if (nonBlockingMoves.length > 0) {
        return nonBlockingMoves[Math.floor(Math.random() * nonBlockingMoves.length)];
      }
    }

    // Block player threats (normal behavior)
    if (playerThreats.length > 0) {
      setAiMood('blocking');
      console.log('💜 AI: "Better block that! 🛡️" (NORMAL BLOCKING)');
      return playerThreats[0];
    }

    // AI Personality Check: Gets excited and makes random move (non-critical situations)
    if (personalityRolls.excited) {
      setAiMood('excited');
      console.log('💜 AI: "Ooh, so many choices! *picks randomly*" (EXCITED TRIGGERED!)');
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // AI Personality Check: Likes cute patterns over optimal play
    if (personalityRolls.cute) {
      setAiMood('cute');
      console.log('💜 AI: "This pattern looks so pretty! 🌸" (CUTE TRIGGERED!)');
      return getCutePatternMove(currentBoard);
    }

    // Use minimax for remaining moves (strategic play)
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = aiSymbol;
        const score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    setAiMood('thinking');
    console.log('💜 AI: "Let me think strategically... 🤔" (STRATEGIC PLAY)');
    return bestMove;
  }, [minimax, aiSymbol, getAvailableMoves, getCutePatternMove, checkWinner, playerSymbol]);

  // Handle player move
  const makeMove = useCallback((index) => {
    if (board[index] !== null || !isPlayerTurn || gameStatus !== 'playing') {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(false);

    // Check if player won
    const result = checkWinner(newBoard);
    if (result) {
      setGameStatus('won');
      setWinningLine(result.line);
      return;
    }

    // Check for draw
    if (isBoardFull(newBoard)) {
      setGameStatus('draw');
      return;
    }

    // AI will move after showing thinking state
    setIsAiThinking(true);

    // First delay to show "thinking" message
    setTimeout(() => {
      const aiMove = getBestMove(newBoard);
      
      // Stop thinking state to show personality message
      setIsAiThinking(false);

      // Second delay to show personality message and make move
      setTimeout(() => {
        if (aiMove !== null) {
          newBoard[aiMove] = aiSymbol;
          setBoard([...newBoard]);

          // Check if AI won
          const aiResult = checkWinner(newBoard);
          if (aiResult) {
            setGameStatus('lost');
            setWinningLine(aiResult.line);
          } else if (isBoardFull(newBoard)) {
            setGameStatus('draw');
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 1000); // Shorter delay for smoother flow
    }, 800); // Longer thinking delay for better pacing
  }, [board, isPlayerTurn, gameStatus, playerSymbol, aiSymbol, checkWinner, isBoardFull, getBestMove]);

  // Reset game
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('playing');
    setWinningLine(null);
    setAiMood('thinking');
    setIsAiThinking(false);
  }, []);

  return {
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
  };
};
