import React, { useState, useRef, useEffect } from 'react';
import './CatPuzzle.css'; // Ensure this file is imported to apply the CSS
import cuteCatImage from './cute-cat.webp'; // Replace with your cute cat image
import heartImage from './heart-health.png';
import explodeHeartImage from './explode-heart.png'; // Explode heart image

const Puzzle = () => {
  const [questions] = useState([
    {
      question: 'what amongst these is literally ur face?',
      options: [':(', ':3', ':)'],
      answer: ':3',
      isTextAnswer: false,
      answeredCorrectly: false
    },
    {
      question: 'how do u spell "cat" backwards?',
      answer: 'tac',
      isTextAnswer: true,
      answeredCorrectly: false
    },
    {
      question: 'whats ur brain size?',
      options: ['very tiny >:3','tiny', 'small', 'medium', 'big'],
      answer: 'very tiny >:3',
      isTextAnswer: false,
      answeredCorrectly: false
    },
    {
      question: 'what is the best thing to do when u see a cat?',
      options: ['run away', 'chase it', 'pet it', 'ignore it'],
      answer: 'pet it',
      isTextAnswer: false,
      answeredCorrectly: false
    },
    {
      question: 'solve this to prove that you are not a robot: 45 + 32 = ? (if u use a calculator, u are a robot)',
      answer: '77',
      isTextAnswer: true,
      answeredCorrectly: false
    },
    {
      question: 'which amongst these is u?',
      options: ['a velicocopeter', 'a dog', 'a pretty stinky owl', 'a human'],
      answer: 'a pretty stinky owl',
      isTextAnswer: false,
      answeredCorrectly: false
    },
    {
      question: 'how do u feel about vinnie?',
      options: ['i love vinnie', 'i hate vinnie', 'i am vinnie', 'i am a robot'],
      answer: 'i love vinnie',
      isTextAnswer: false,
      answeredCorrectly: false
    }
    // Add more questions as needed
  ]);

  useEffect(() => {
    document.title = 'the cat puzzle :3'; // Set your desired title here
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hearts, setHearts] = useState(2); // Number of chances (hearts)
  const [showCat, setShowCat] = useState(false);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const inputRef = useRef(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(true);

  useEffect(() => {
    if (gameOver && !puzzleComplete) {
      setTimeout(() => {
        setPuzzleComplete(true);
      }, 2000); // Delay before showing puzzle complete after game over
    }
  }, [gameOver, puzzleComplete]);

  const handleAnswer = (selectedOption) => {
    if (questions[currentQuestionIndex].answeredCorrectly || gameOver || transitioning) {
      return; // Disable answering if already answered correctly, game over, or transitioning
    }

    setTransitioning(true);

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setAnsweredCorrectly(true);
      
      setShowCat(true); // Show cute cat image on correct answer
      setTimeout(() => {
        questions[currentQuestionIndex].answeredCorrectly = true;
        moveToNextQuestion();
      }, 2000); // 2 seconds before hiding the cute cat image
    } else {
      setAnsweredCorrectly(false);
      animateExplodeHeart(); // Animate explode heart on incorrect answer
      setHearts(hearts - 1); // Decrease hearts on incorrect answer
      if (hearts - 1 === 0) {
        setGameOver(true); // Set game over when hearts are depleted
      } else {
        setTimeout(() => {
          setTransitioning(false); // Reset transitioning state
        }, 2000); // 2 seconds before resetting transition state and moving to next question
      }
    }
  };

  const handleTextAnswer = (inputAnswer) => {
    if (questions[currentQuestionIndex].answeredCorrectly || gameOver || transitioning || hearts === 0) {
      return; // Disable answering if already answered correctly, game over, or transitioning
    }

    setTransitioning(true);

    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
    if (inputAnswer.toLowerCase() === correctAnswer) {
      setShowCat(true); // Show cute cat image on correct answer
      setTimeout(() => {
        questions[currentQuestionIndex].answeredCorrectly = true;
        moveToNextQuestion();
      }, 1000); // 2 seconds before hiding the cute cat image
    } else {
      animateExplodeHeart(); // Animate explode heart on incorrect answer
      setHearts(hearts - 1); // Decrease hearts on incorrect answer
      if (hearts === 0) {
        setGameOver(true); // Set game over when hearts are depleted
      } else {
        setTimeout(() => {
          setTransitioning(false); // Reset transitioning state
          // moveToNextQuestion();
        }, 1500); // 2 seconds before resetting transition state and moving to next question
      }
    }
  };

  const moveToNextQuestion = () => {
    setTimeout(() => {
      setTransitioning(false); // Reset transitioning state
      setShowCat(false); // Hide cute cat image when moving to next question
      if (currentQuestionIndex === questions.length - 1) {
        setPuzzleComplete(true); // Mark puzzle as complete after last question
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
        if (inputRef.current) {
          inputRef.current.value = ''; // Reset text input
        }
      }
    }, 1000); // 1 second delay before moving to next question
  };

  const animateExplodeHeart = () => {
    // Function to animate explode heart goes here if needed
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleTextAnswer(event.target.value);
    }
  };

  const handleOptionClick = (selectedOption) => {
    handleAnswer(selectedOption);
  };

  return (
    <div className="puzzle-window">
      <div className="puzzle-container">
        {!puzzleComplete && !gameOver && hearts > 0 && (
          <>
            <div className="hearts">
              {transitioning && !answeredCorrectly && <img src={explodeHeartImage} alt="Heart" className="heart-icon" style={{ animation: transitioning ? 'none' : 'heartbeat 0.s infinite' }} />}
              {Array.from({ length: hearts }, (_, index) => (
                <img key={index} src={heartImage} alt="Heart" className="heart-icon" style={{ animation: transitioning ? 'none' : 'heartbeat 0.s infinite' }} />
              ))}
            </div>
            <div className="question-container">
              <h2>Question {currentQuestionIndex + 1}</h2>
              <p>{questions[currentQuestionIndex].question}</p>
              {!questions[currentQuestionIndex].isTextAnswer ? (
                <div className="options">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(option)} disabled={questions[currentQuestionIndex].answeredCorrectly || transitioning}>
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-answer">
                  <input type="text" placeholder="Type your answer" ref={inputRef} onKeyPress={handleKeyPress} />
                  <button onClick={() => handleTextAnswer(inputRef.current.value)} disabled={questions[currentQuestionIndex].answeredCorrectly || transitioning}>Submit</button>
                </div>
              )}
            </div>
          </>
        )}
        {showCat && <img src={cuteCatImage} alt="Cute Cat" className="cute-cat" />}
        {((gameOver && puzzleComplete) || hearts === 0) && (
          <div className="game-over-message">
            <p>Nooooo! You lost. Try again next time!</p>
          </div>
        )}
        {puzzleComplete && !gameOver && (
          <div className="congratulations-window">
            <h2>Congratulations! Puzzle Complete!</h2>
            <img src={cuteCatImage} alt="Cute Cat" className="cute-cat" />
            <p>yippppieee!! you are a cat!!!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Puzzle;
