import React, { useRef } from 'react';

const QuestionDisplay = ({ 
  question, 
  questionIndex, 
  onAnswer, 
  disabled 
}) => {
  const inputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleTextSubmit();
    }
  };

  const handleTextSubmit = () => {
    const value = inputRef.current?.value?.trim();
    if (value) {
      onAnswer(value);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleOptionClick = (option) => {
    onAnswer(option);
  };

  return (
    <div className="question-container">
      <h2>Question {questionIndex + 1}</h2>
      <p>{question.question}</p>
      
      {!question.isTextAnswer ? (
        <div className="options">
          {question.options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleOptionClick(option)} 
              disabled={disabled}
              className="option-button"
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-answer">
          <input 
            type="text" 
            placeholder="Type your answer" 
            ref={inputRef} 
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="text-input"
          />
          <button 
            onClick={handleTextSubmit} 
            disabled={disabled}
            className="submit-button"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
