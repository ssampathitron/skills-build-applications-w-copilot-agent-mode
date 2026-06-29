import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    mascot: { type: String, trim: true },
    members: [{ type: String, trim: true }],
    points: { type: Number, default: 0 },
}, { timestamps: true });
export const TeamModel = model('Team', teamSchema, 'teams');
