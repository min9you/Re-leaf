import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route matching the prompt requirement
app.post('/api/generate-essay', async (req, res) => {
  try {
    const { productName, material, seasonStory, co2Reduction } = req.body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      throw new Error('API key is missing.');
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `친환경 업사이클링 브랜드 'Re:leaf'의 제품 '${productName}'에 대한 따뜻하고 서정적인 에세이와 진품 보증 멘트를 한글로 작성해줘.
      
[제품 정보]
수명 연장 소재: ${material} (KBO 야구 자재 업사이클링)
시즌 및 한정 서사: ${seasonStory}
이산화탄소 절감량: ${co2Reduction}kg

[작성 요구사항]
1. 에세이는 한 구장에서 뜨거운 함성과 함께 수명을 다한 야구 폐자재가 우리의 아름다운 일상 소품으로 되살아나 숨결을 이어가는 서사를 녹여내야 해.
2. 부드럽고 따뜻하며 사색적인 어조로 에세이는 2~3문단 정도로 작성해줘.
3. 진품 보증 멘트는 이 제품이 KBO 폐자재로 제작된 유일무이한 서사를 품은 Re:leaf의 정품을 보증한다는 영감을 주는 1문장이어야 해.

반드시 오로지 아래 형식의 유효한 JSON 문자열로만 응답해줘. 코드 블록(\`\`\`)이나 다른 텍스트는 포함하지 말아줘! (JSON만 반환해야 해):
{
  "essay": "여기에 감동적인 에세이 본문 내용을 작성해주세요.",
  "guarantee": "이 조각은 2025 시즌의 잠실 뜨거웠던 타석 한 구석을 온전히 품었음을 증명합니다."
}`,
      config: {
        responseMimeType: 'application/json',
      }
    });

    // Try parsing the response
    let rawText = response.text || '';
    // Clean code blocks if model ignored the restriction
    rawText = rawText.replace(/```json\s?/g, '').replace(/```\s?/g, '').trim();

    const data = JSON.parse(rawText);
    res.json(data);
  } catch (error: any) {
    console.error('Error in generating essay:', error);
    res.status(500).json({ error: error.message || 'Failed to generate essay' });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Vite integration
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);
  app.get('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const html = await vite.transformIndexHtml(url, `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Noto+Serif+KR:wght@500;600;700;900&display=swap" rel="stylesheet" />
    <title>Re:leaf | KBO Upcycle · Season Material</title>
  </head>
  <body class="bg-[#F5F0E4] text-[#23282B] antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      next(e);
    }
  });
}

app.listen(PORT, () => {
  console.log(`Express custom server running on http://localhost:${PORT}`);
});
