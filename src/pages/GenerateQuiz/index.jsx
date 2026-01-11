import { useState } from "react";
import { FaPlayCircle, FaEye } from "react-icons/fa";

import QuizForm from "../../components/QuizForm";
import TakeQuiz from "../../components/TakeQuiz";
import QuizCard from "../../components/QuizCard";
import "./index.css";

export default function GenerateQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [mode, setMode] = useState("view");

  return (
    <div className="generate-quiz-page">
      <QuizForm onResult={setQuiz} />

      {quiz && (
        <>
          <h3>{quiz.questions.length} Questions Generated</h3>

          {mode === "view" ? (
            quiz.questions.map((q, i) => (
              <QuizCard key={i} question={q} />
            ))
          ) : (
            <TakeQuiz quiz={quiz.questions} />
          )}

          <button
            className="button"
            onClick={() => setMode(mode === "view" ? "take" : "view")}
          >
            {mode === "view" ? (
              <>
                <FaPlayCircle style={{ marginRight: "8px" }} />
                Take Quiz
              </>
            ) : (
              <>
                <FaEye style={{ marginRight: "8px" }} />
                View Answers
              </>
            )}
          </button>

        </>
      )}
    </div>
  );
}

