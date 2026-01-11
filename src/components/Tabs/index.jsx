import { useState } from "react";
import GenerateQuiz from "../../pages/GenerateQuiz";
import History from "../../pages/History";
import "./index.css";

export default function Tabs() {
  const [tab, setTab] = useState("generate");

  const tabs = [
    {
      id: "generate",
      label: "Generate Quiz",
      icon: "✨",
      description: "Create new quizzes from Wikipedia"
    },
    {
      id: "history",
      label: "Quiz History", 
      icon: "📚",
      description: "View your past quizzes"
    }
  ];

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <h1 className="heading">AI MCQ Quiz Generator</h1>
        <div className="tabs-nav">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`tab-button ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
              aria-label={`Switch to ${label}`}
              aria-selected={tab === id}
            >
              <span className="tab-icon">{icon}</span>
              <span className="tab-label">{label}</span>
              <div className="tab-indicator"></div>
            </button>
          ))}
        </div>
      </div>

      <div className="tabs-content">
        <div 
          className={`tab-panel ${tab === 'generate' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="generate-tab"
        >
          <GenerateQuiz />
        </div>
        <div 
          className={`tab-panel ${tab === 'history' ? 'active' : ''}`}
          role="tabpanel"
          aria-labelledby="history-tab"
        >
          <History />
        </div>
      </div>
    </div>
  );
}
