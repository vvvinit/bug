import { useState, useEffect, useCallback } from 'react';
import { GAME_CONFIG, QUIZ_QUESTIONS } from '../constants';

/**
 * Custom hook for managing cat puzzle game state
 * @returns {Object} - Game state and actions
 */
export const useCatPuzzle = () => {
  const [questions, setQuestions] = useState(() => QUIZ_QUESTIONS.map(q => ({ ...q })));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hearts, setHearts] = useState(GAME_CONFIG.INITIAL_HEARTS);
  const [showCat, setShowCat] = useState(false);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Game over state is now handled manually via resetGame function
  // No automatic transitions - user must click "Play Again"

  const moveToNextQuestion = useCallback(() => {
    const timer = setTimeout(() => {
      setTransitioning(false);
      setShowCat(false);
      
      if (isLastQuestion) {
        setPuzzleComplete(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, GAME_CONFIG.NEXT_QUESTION_DELAY);

    return () => clearTimeout(timer);
  }, [isLastQuestion]);

  const handleCorrectAnswer = useCallback(() => {
    setAnsweredCorrectly(true);
    setShowCat(true);
    
    const timer = setTimeout(() => {
      questions[currentQuestionIndex].answeredCorrectly = true;
      moveToNextQuestion();
    }, GAME_CONFIG.CAT_DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [currentQuestionIndex, questions, moveToNextQuestion]);

  const handleIncorrectAnswer = useCallback(() => {
    setAnsweredCorrectly(false);
    const newHearts = hearts - 1;
    setHearts(newHearts);
    
    if (newHearts === 0) {
      setGameOver(true);
    } else {
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, GAME_CONFIG.HEART_ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  const handleAnswer = useCallback((selectedAnswer) => {
    if (currentQuestion.answeredCorrectly || gameOver || transitioning) {
      return;
    }

    setTransitioning(true);

    const correctAnswer = currentQuestion.isTextAnswer 
      ? currentQuestion.answer.toLowerCase()
      : currentQuestion.answer;
    
    const userAnswer = currentQuestion.isTextAnswer 
      ? selectedAnswer.toLowerCase()
      : selectedAnswer;

    if (userAnswer === correctAnswer) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  }, [currentQuestion, gameOver, transitioning, handleCorrectAnswer, handleIncorrectAnswer]);

  const resetGame = useCallback(() => {
    setCurrentQuestionIndex(0);
    setHearts(GAME_CONFIG.INITIAL_HEARTS);
    setShowCat(false);
    setPuzzleComplete(false);
    setGameOver(false);
    setTransitioning(false);
    setAnsweredCorrectly(true);
    
    // Reset all questions by creating fresh copies
    setQuestions(QUIZ_QUESTIONS.map(q => ({ ...q })));
  }, []);

  return {
    // State
    currentQuestion,
    currentQuestionIndex,
    hearts,
    showCat,
    puzzleComplete,
    gameOver,
    transitioning,
    answeredCorrectly,
    isLastQuestion,
    
    // Actions
    handleAnswer,
    resetGame,
  };
};
