import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function evaluateTask(task: string) {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful AI evaluator for student learning tasks.' },
      { role: 'user', content: `Evaluate this task: ${task}` }
    ],
    model: 'gpt-4',
  });

  return response.choices[0].message.content;
}
