import { useState } from 'react';

export default function AgentInput() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResponse(data.reply || 'Keine Antwort erhalten');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl text-white space-y-4">
      <h2 className="text-xl font-semibold">🎓 GPT Lern-Coach</h2>
      <textarea
        className="w-full p-2 rounded bg-gray-700 text-white"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Frag den KI-Coach z.B. Was soll ich heute lernen?"
      />
      <button
        onClick={handleSend}
        className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded"
      >
        Frage senden
      </button>
      {response && (
        <div className="bg-gray-700 p-3 rounded text-sm whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}
