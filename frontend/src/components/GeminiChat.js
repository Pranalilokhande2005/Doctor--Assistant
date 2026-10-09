import { useState } from "react";
import { askGemini } from "../api/api";

export default function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await askGemini(prompt);
    setResponse(res.text || "No response");
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <textarea className="input" onChange={(e) => setPrompt(e.target.value)} placeholder="Ask Gemini..." />
      <button onClick={handleSubmit} className="btn">Ask</button>
      <p className="mt-2">{response}</p>
    </div>
  );
}
