import express, { Request, Response } from 'express';
import {
  runLocalGrammarCheck,
  runLocalGrammarCorrect,
  runLocalRewrite,
} from '../src/utils/grammarEngine.ts';

const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    configured: true,
    provider: process.env.GEMINI_API_KEY ? 'gemini' : 'built-in',
  });
});

app.post('/api/grammar/check', async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Please provide valid text to check.' });
  }

  try {
    const local = runLocalGrammarCheck(text);
    return res.json({
      success: true,
      score: local.score,
      summary: local.summary,
      issues: local.issues,
      provider: 'built-in-engine',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Check failed' });
  }
});

app.post('/api/grammar/correct', async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Please provide valid text to correct.' });
  }

  try {
    const local = runLocalGrammarCorrect(text);
    return res.json({
      success: true,
      correctedText: local.correctedText,
      improvements: local.improvements,
      provider: 'built-in-engine',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Correction failed' });
  }
});

app.post('/api/grammar/rewrite', async (req: Request, res: Response) => {
  const { text, tone } = req.body;
  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Please provide valid text to rewrite.' });
  }

  try {
    const local = runLocalRewrite(text, tone);
    return res.json({
      success: true,
      rewrittenText: local.rewrittenText,
      tone: tone || 'Professional',
      highlights: local.highlights,
      provider: 'built-in-engine',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Rewrite failed' });
  }
});

export default app;
