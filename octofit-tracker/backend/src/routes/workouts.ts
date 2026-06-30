import { Router } from 'express';
import { WorkoutModel } from '../models/workout.js';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ focus: 1, title: 1 }).lean();
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.post('/', async (request, response, next) => {
  try {
    const workout = await WorkoutModel.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});