import cors from 'cors';
import express from 'express';
import { getBaseUrl } from './config/environment.js';
import { activitiesRouter } from './routes/activities.js';
import { healthRouter } from './routes/health.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamsRouter } from './routes/teams.js';
import { usersRouter } from './routes/users.js';
import { workoutsRouter } from './routes/workouts.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api', (_request, response) => {
    response.json({
      baseUrl: getBaseUrl(),
      endpoints: [
        '/api/users/',
        '/api/teams/',
        '/api/activities/',
        '/api/leaderboard/',
        '/api/workouts/',
      ],
      message: 'OctoFit Tracker API is ready.',
    });
  });

  app.use('/api/users', usersRouter);
  app.use('/api/teams', teamsRouter);
  app.use('/api/activities', activitiesRouter);
  app.use('/api/leaderboard', leaderboardRouter);
  app.use('/api/workouts', workoutsRouter);
  app.use('/api/health', healthRouter);

  app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    response.status(500).json({ error: error.message });
  });

  return app;
}
