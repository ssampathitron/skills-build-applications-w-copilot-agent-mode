import { Router } from 'express';
import { TeamModel } from '../models/team.js';
export const teamsRouter = Router();
teamsRouter.get('/', async (_request, response, next) => {
    try {
        const teams = await TeamModel.find().sort({ name: 1 }).lean();
        response.json(teams);
    }
    catch (error) {
        next(error);
    }
});
teamsRouter.post('/', async (request, response, next) => {
    try {
        const team = await TeamModel.create(request.body);
        response.status(201).json(team);
    }
    catch (error) {
        next(error);
    }
});
