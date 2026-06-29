import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    teamName: { type: String, trim: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardModel = model('Leaderboard', leaderboardSchema, 'leaderboard');