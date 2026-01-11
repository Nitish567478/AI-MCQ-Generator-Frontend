import { useEffect, useState } from "react";
import { fetchHistory, clearHistory } from "../../services/api";
import QuizModal from "../../components/QuizModal";
import "./index.css";

export default function History() {
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await fetchHistory();
    setRows(data);
  };

  const handleClear = async () => {
    await clearHistory();
    setRows([]);
  };

  return (
    <div className="history-page">
      <h3 className="history-heading">View and review previously generated quizzes</h3>

      <div className="clear-wrapper">
        <button className="danger" onClick={handleClear}>
          Clear History
        </button>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Questions</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((q) => (
            <tr key={q.id}>
              <td>{q.title}</td>
              <td className="url-cell">{q.url}</td>
              <td>{q.questions}</td>
              <td>
                {new Date(q.created_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </td>
              <td>
                <button
                  className="secondary"
                  onClick={() => setSelectedId(q.id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedId && (
        <QuizModal quizId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
