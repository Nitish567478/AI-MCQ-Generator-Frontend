import "./index.css";

export default function QuizCard({ question }) {
  const difficulty = (question.difficulty || "easy").toLowerCase();

  const color =
    difficulty === "easy"
      ? "green"
      : difficulty === "medium"
      ? "orange"
      : "red";

  return (
    <div className="quiz-card">
      <div className="difficulty-badge" style={{ backgroundColor: color }}>
        {difficulty.toUpperCase()}
      </div>

      <h3>{question.question}</h3>

      <ul>
        {question.options.map((opt, i) => (
          <li
            key={i}
            style={{
              color: opt === question.answer ? "green" : "#333",
              fontWeight: opt === question.answer ? "bold" : "normal",
            }}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}
