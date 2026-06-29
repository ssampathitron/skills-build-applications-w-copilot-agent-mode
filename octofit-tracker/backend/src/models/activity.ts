import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    points: { type: Number, default: 0 },
    activityDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const ActivityModel = model('Activity', activitySchema, 'activities');