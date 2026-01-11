import { useState } from "react";
import "./index.css";

export default function TakeQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const submitQuiz = () => {
    let correct = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div className="take-quiz-container">
      {quiz.map((q, idx) => (
        <div key={idx} className="quiz-question">
          <h4>Q{idx + 1}. {q.question}</h4>

          {q.options.map((opt, i) => (
            <label
              key={i}
              style={{
                display: "block",
                color: submitted
                  ? opt === q.answer
                    ? "green"
                    : answers[idx] === opt
                    ? "red"
                    : "#333"
                  : "#333",
              }}
            >
              <input
                type="radio"
                name={`q-${idx}`}
                disabled={submitted}
                checked={answers[idx] === opt}
                onChange={() =>
                  setAnswers({ ...answers, [idx]: opt })
                }
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      {!submitted && (
        <button onClick={submitQuiz}>Submit Quiz</button>
      )}

      {submitted && (
        <h3>
          Score: {score} / {quiz.length}
        </h3>
      )}
    </div>
  );
}
