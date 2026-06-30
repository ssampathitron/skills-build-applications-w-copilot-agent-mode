import { Router } from 'express';
import { ActivityModel } from '../models/activity.js';
export const activitiesRouter = Router();
activitiesRouter.get('/', async (_request, response, next) => {
    try {
        const activities = await ActivityModel.find().sort({ activityDate: -1 }).lean();
        response.json(activities);
    }
    catch (error) {
        next(error);
    }
});
activitiesRouter.post('/', async (request, response, next) => {
    try {
        const activity = await ActivityModel.create(request.body);
        response.status(201).json(activity);
    }
    catch (error) {
        next(error);
    }
});
