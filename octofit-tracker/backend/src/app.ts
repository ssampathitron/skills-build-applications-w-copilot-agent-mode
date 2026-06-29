import cors from 'cors';
import express from 'express';
import { healthRouter } from './routes/health.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api', (_request, response) => {
    response.json({ message: 'OctoFit Tracker API is ready.' });
  });

  app.use('/api/health', healthRouter);

  return app;
}
