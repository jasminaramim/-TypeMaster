import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import {
  runLocalGrammarCheck,
  runLocalGrammarCorrect,
  runLocalRewrite,
} from './src/utils/grammarEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

// Helper to get GoogleGenAI client
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Timeout helper for Gemini calls to avoid hanging requests
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), ms)
    ),
  ]);
}

// 1. Health / Config status
app.get('/api/status', (_req: Request, res: Response) => {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    configured: true,
    provider: hasGemini ? 'gemini' : 'built-in',
  });
});

// 2. Grammar Checker endpoint
app.post('/api/grammar/check', async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Please provide valid text to check.' });
  }

  const ai = getGenAI();

  // If Gemini is available, attempt AI check with a 5-second timeout
  if (ai) {
    try {
      const prompt = `Analyze the following text for all grammar, spelling, punctuation, capitalization, syntax, and sentence structure issues.
Language may be English or Bengali.
Text to inspect:
"""
${text}
"""`;

      const aiCall = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an elite multilingual proofreader and editor. Return a JSON object with score (0-100), summary, and an array of detected issues.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER },
              summary: { type: Type.STRING },
              issues: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    original: { type: Type.STRING },
                    suggestion: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                  },
                  required: ['category', 'original', 'suggestion', 'explanation'],
                },
              },
            },
            required: ['score', 'summary', 'issues'],
          },
        },
      });

      const response = await withTimeout(aiCall, 2500);
      const parsed = JSON.parse(response.text || '{}');
      if (parsed.score !== undefined && Array.isArray(parsed.issues)) {
        return res.json({
          success: true,
          source: 'gemini',
          score: parsed.score,
          summary: parsed.summary || 'Analysis complete.',
          issues: parsed.issues,
        });
      }
    } catch (err: any) {
      console.warn('Gemini check skipped or timed out, falling back to linguistic engine:', err.message);
    }
  }

  // High-precision built-in linguistic grammar engine fallback
  const localResult = runLocalGrammarCheck(text);
  return res.json({
    success: true,
    source: 'linguistic-engine',
    score: localResult.score,
    summary: localResult.summary,
    issues: localResult.issues,
  });
});

// 3. One-Click Correct Grammar endpoint
app.post('/api/grammar/correct', async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Please provide valid text to correct.' });
  }

  const ai = getGenAI();

  if (ai) {
    try {
      const prompt = `Correct all spelling, grammar, punctuation, and capitalization errors in this text while preserving exact meaning.
Input text:
"""
${text}
"""`;

      const aiCall = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert editorial proofreader. Return JSON with correctedText and improvements list.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              correctedText: { type: Type.STRING },
              improvements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['correctedText', 'improvements'],
          },
        },
      });

      const response = await withTimeout(aiCall, 2500);
      const parsed = JSON.parse(response.text || '{}');
      if (parsed.correctedText) {
        return res.json({
          success: true,
          source: 'gemini',
          correctedText: parsed.correctedText,
          improvements: parsed.improvements || [],
        });
      }
    } catch (err: any) {
      console.warn('Gemini correct skipped or timed out, falling back to linguistic engine:', err.message);
    }
  }

  const localResult = runLocalGrammarCorrect(text);
  return res.json({
    success: true,
    source: 'linguistic-engine',
    correctedText: localResult.correctedText,
    improvements: localResult.improvements,
  });
});

// 4. AI Rewrite Text endpoint
app.post('/api/grammar/rewrite', async (req: Request, res: Response) => {
  const { text, tone } = req.body;

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Please provide valid text to rewrite.' });
  }

  const validTones = ['Professional', 'Simple English', 'Formal', 'Friendly', 'Improve Clarity'];
  const chosenTone = validTones.includes(tone) ? tone : 'Professional';

  const ai = getGenAI();

  if (ai) {
    try {
      const prompt = `Rewrite this text in the "${chosenTone}" tone style. Preserve core meaning and return JSON.
Input text:
"""
${text}
"""`;

      const aiCall = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an award-winning writing coach and professional rewriter.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rewrittenText: { type: Type.STRING },
              toneApplied: { type: Type.STRING },
              highlights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['rewrittenText', 'toneApplied'],
          },
        },
      });

      const response = await withTimeout(aiCall, 2500);
      const parsed = JSON.parse(response.text || '{}');
      if (parsed.rewrittenText) {
        return res.json({
          success: true,
          source: 'gemini',
          rewrittenText: parsed.rewrittenText,
          toneApplied: parsed.toneApplied || chosenTone,
          highlights: parsed.highlights || [],
        });
      }
    } catch (err: any) {
      console.warn('Gemini rewrite skipped or timed out, falling back to linguistic engine:', err.message);
    }
  }

  const localResult = runLocalRewrite(text, chosenTone as any);
  return res.json({
    success: true,
    source: 'linguistic-engine',
    rewrittenText: localResult.rewrittenText,
    toneApplied: chosenTone,
    highlights: localResult.highlights,
  });
});

// Production static serving vs Dev Vite middleware
async function setupViteOrStatic() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }
}

setupViteOrStatic().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`TypeMaster server listening on http://0.0.0.0:${port}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
});
