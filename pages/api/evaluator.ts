import type { NextApiRequest, NextApiResponse } from 'next';
import { evaluateTask } from '@/lib/ai/evaluator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Missing task' });

  try {
    const evaluation = await evaluateTask(task);
    res.status(200).json({ evaluation });
  } catch (err) {
    res.status(500).json({ error: 'Evaluation failed', details: err });
  }
}
