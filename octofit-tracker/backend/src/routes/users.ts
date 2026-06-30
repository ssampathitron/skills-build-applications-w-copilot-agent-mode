import { Router } from 'express';
import { UserModel } from '../models/user.js';

export const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    const users = await UserModel.find().sort({ username: 1 }).lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const user = await UserModel.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});