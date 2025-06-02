import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) setMessage(error.message);
    else setMessage('Erfolgreich!');

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded text-white max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-center">{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="w-full p-2 rounded bg-gray-700"
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-700"
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 p-2 rounded" disabled={loading}>
          {loading ? 'Lade...' : isLogin ? 'Einloggen' : 'Registrieren'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="text-sm underline text-center block w-full">
        {isLogin ? 'Noch kein Konto? Registrieren' : 'Schon registriert? Einloggen'}
      </button>
      {message && <p className="text-sm text-center text-yellow-400">{message}</p>}
    </div>
  );
}
