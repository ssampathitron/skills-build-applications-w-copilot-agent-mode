import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    teamId: { type: String, trim: true },
  },
  { timestamps: true },
);

export const UserModel = model('User', userSchema, 'users');