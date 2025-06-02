import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { runAgent } from '@/lib/ai/agent';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!message || !token) return res.status(400).json({ error: 'Fehlende Nachricht oder Token' });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Nicht authentifiziert' });

  try {
    const reply = await runAgent(message, user.id);
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Agent-Fehler', details: err });
  }
}
