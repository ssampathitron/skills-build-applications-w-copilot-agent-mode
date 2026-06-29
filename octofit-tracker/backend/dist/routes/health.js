import { Router } from 'express';
import { getBaseUrl } from '../config/environment.js';
export const healthRouter = Router();
healthRouter.get('/', (_request, response) => {
    response.json({
        baseUrl: getBaseUrl(),
        service: 'octofit-tracker-backend',
        status: 'ok',
    });
});
