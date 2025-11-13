import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
