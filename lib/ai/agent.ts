import { OpenAI } from 'openai';
import { supabase } from '../supabase';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runAgent(message: string, user_id: string): Promise<string> {
  const chat = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Du bist ein KI-Coach für technisches Lernen mit Fokus auf Instandhaltung und IT. Gib motivierende, konkrete Vorschläge und Tipps.',
      },
      {
        role: 'user',
        content: message,
      },
    ],
  });

  const response = chat.choices[0].message.content || '';

  await supabase.from('gpt_messages').insert({
    user_input: message,
    gpt_response: response,
    user_id,
  });

  return response;
}
