import React, { useState } from 'react';
import axios from 'axios';

const AskGemini = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      const res = await axios.post('http://localhost:8000/api/gemini/ask', {
        question: question,
      });

      setAnswer(res.data.answer); // ✅ matches "answer" key from backend
    } catch (error) {
      console.error(error);
      setAnswer('Something went wrong while contacting the backend.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Ask Gemini</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
        className="w-full max-w-xl p-2 border border-gray-300 rounded mb-4"
        rows={4}
      />

      <button
        onClick={handleAsk}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Ask
      </button>

      {answer && (
        <div className="mt-6 w-full max-w-xl p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg mb-2">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskGemini;
