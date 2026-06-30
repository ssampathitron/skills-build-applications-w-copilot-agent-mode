import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationMinutes: { type: Number, required: true, min: 0 },
    exercises: [{ type: String, trim: true }],
    suggestedFor: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const WorkoutModel = model('Workout', workoutSchema, 'workouts');