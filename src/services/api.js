const BASE_URL = "https://ai-mcq-generator-c1wz.onrender.com"

// "http://127.0.0.1:8000";

export async function generateQuiz(url) {
  const res = await fetch(`${BASE_URL}/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/api/quiz/history`);

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function fetchQuizDetails(id) {
  const res = await fetch(`${BASE_URL}/api/quiz/${id}`);

  if (!res.ok) {
    throw new Error("Failed to load quiz details");
  }

  return res.json();
}

export async function clearHistory() {
  const res = await fetch(`${BASE_URL}/api/quiz/clear`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to clear history");
  }

  return true;
}
