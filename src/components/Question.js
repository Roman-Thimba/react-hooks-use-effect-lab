import { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        setTimeRemaining(10);        // Reset timer
        onAnswered(false);           // Auto-answer as incorrect
      }
    }, 1000);

    // Cleanup timeout on each render
    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]); // dependency array

  return (
    <div>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <p>Time Remaining: {timeRemaining}</p>
    </div>
  );
}

export default Question;
