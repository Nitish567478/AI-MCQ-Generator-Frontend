import { useState } from "react";
import { generateQuiz } from "../../services/api";
import "./index.css";

export default function QuizForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const submit = async () => {
  if (!url.trim()) {
    setError("Please enter a Wikipedia article URL");
    return;
  }

  if (url.includes("Main_Page")) {
    setError("Wikipedia Main Page se quiz generate nahi hota");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const data = await generateQuiz(url);

    if (!data.questions || data.questions.length === 0) {
      setError("Is Wikipedia page se quiz generate nahi ho paya");
      return;
    }

    onResult(data);
  } catch (err) {
    setError("Failed to generate quiz");
  } finally {
    setLoading(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      submit();
    }
  };

  return (
    <div className="quiz-form-container">
      <div className="form-header">
        <h2 className="form-title">Generate Quiz</h2>
        <p className="form-subtitle">
          Enter any Wikipedia URL to instantly create a quiz
        </p>
      </div>

      <div className="form-input-group">
        <div className="input-wrapper">
          <div className="input-icon">🔗</div>
          <input
            className={`quiz-input ${error ? 'error' : ''}`}
            type="url"
            placeholder="https://en.wikipedia.org/wiki/JavaScript"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <div className="input-suffix">
            {url && (
              <span className="url-preview">
                {new URL(url).pathname.replace(/^\//, '') || 'Wikipedia'}
              </span>
            )}
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
      </div>

      <button 
        className={`generate-btn ${loading ? 'loading' : ''}`}
        onClick={submit}
        disabled={loading || !url.trim()}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Generating Quiz...
          </>
        ) : (
          <>
            <span className="btn-icon">✨</span>
            Generate Quiz
          </>
        )}
      </button>

      <div className="form-help">
        <p>
          <strong>Tip:</strong> Use any Wikipedia article URL. 
          The AI will analyze it and create relevant questions.
        </p>
      </div>
    </div>
  );
}
