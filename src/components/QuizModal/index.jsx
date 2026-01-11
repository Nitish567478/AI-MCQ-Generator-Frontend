import { useEffect, useState } from "react";
import { fetchQuizDetails } from "../../services/api";
import "./index.css";

export default function QuizModal({ quizId, onClose }) {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    const data = await fetchQuizDetails(quizId);
    setQuiz(data);
  };

  if (!quiz) return null;

  return (
    <div className="quiz-modal-overlay">
      <div className="quiz-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>{quiz.title}</h2>

        {/* ✅ SUMMARY (STRING) */}
        <p className="quiz-summary">
          {quiz.summary || "No summary available."}
        </p>

        {/* ✅ BULLET POINTS (ARRAY) */}
        {quiz.points?.length > 0 && (
          <>
            <h4>Key Points</h4>
            <ul>
              {quiz.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </>
        )}

        <hr />

        {/* ✅ ALL MCQs */}
        <h3>MCQ Questions</h3>

        {quiz.questions.map((q, i) => (
          <div key={i} className="modal-question">
            <div className="question-header">
              <strong>Q{i + 1}.</strong> {q.question}
              <span className={`badge ${q.difficulty}`}>
                {q.difficulty}
              </span>
            </div>

            <ul>
              {q.options.map((opt, idx) => (
                <li
                  key={idx}
                  style={{
                    color: opt === q.answer ? "green" : "#333",
                    fontWeight: opt === q.answer ? "bold" : "normal"
                  }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
