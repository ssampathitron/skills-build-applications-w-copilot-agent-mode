import { Router } from 'express';
import { LeaderboardModel } from '../models/leaderboard.js';
export const leaderboardRouter = Router();
leaderboardRouter.get('/', async (_request, response, next) => {
    try {
        const leaderboard = await LeaderboardModel.find().sort({ points: -1, rank: 1 }).lean();
        response.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
leaderboardRouter.post('/', async (request, response, next) => {
    try {
        const entry = await LeaderboardModel.create(request.body);
        response.status(201).json(entry);
    }
    catch (error) {
        next(error);
    }
});
