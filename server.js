import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

import triageflowRouter from './server/routes/triageflow.js';
import documentsRouter from './server/routes/documents.js';
import chatRouter from './server/routes/chat.js';
import seedRouter from './server/routes/seed.js';
import evaluationRouter from './server/routes/evaluation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Mount API routers
  app.use('/api', triageflowRouter);
  app.use('/api/documents', documentsRouter);
  app.use('/api/chat', chatRouter);
  app.use('/api/seed', seedRouter);
  app.use('/api/evaluation', evaluationRouter);

  // Serve demo data & sample documents statically
  app.use('/demo_data', express.static(path.join(__dirname, 'demo_data')));
  app.use('/sample-documents', express.static(path.join(__dirname, 'sample-documents')));

  // Vite middleware for dev / static for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TRIAGEFLOW AI] Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
