import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';

async function seedDatabase(): Promise<void> {
  const connectionString = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(connectionString, {
    dbName: 'octofit_db',
  });

  const teams = [
    {
      name: 'Harbor Hustlers',
      mascot: 'Orca',
      members: ['alex.fit', 'maria.moves'],
      points: 980,
    },
    {
      name: 'Summit Sprinters',
      mascot: 'Falcon',
      members: ['dev.cardio', 'nina.lift'],
      points: 870,
    },
    {
      name: 'Core Commanders',
      mascot: 'Octopus',
      members: ['liam.pace', 'zoe.stretch'],
      points: 790,
    },
  ];

  const users = [
    {
      username: 'alex.fit',
      displayName: 'Alex Rivera',
      email: 'alex.rivera@octofit.dev',
      teamId: 'Harbor Hustlers',
    },
    {
      username: 'maria.moves',
      displayName: 'Maria Chen',
      email: 'maria.chen@octofit.dev',
      teamId: 'Harbor Hustlers',
    },
    {
      username: 'dev.cardio',
      displayName: 'Dev Patel',
      email: 'dev.patel@octofit.dev',
      teamId: 'Summit Sprinters',
    },
    {
      username: 'nina.lift',
      displayName: 'Nina Okafor',
      email: 'nina.okafor@octofit.dev',
      teamId: 'Summit Sprinters',
    },
    {
      username: 'liam.pace',
      displayName: 'Liam Costa',
      email: 'liam.costa@octofit.dev',
      teamId: 'Core Commanders',
    },
    {
      username: 'zoe.stretch',
      displayName: 'Zoe Kim',
      email: 'zoe.kim@octofit.dev',
      teamId: 'Core Commanders',
    },
  ];

  const activities = [
    {
      userId: 'alex.fit',
      type: 'Tempo Run',
      durationMinutes: 42,
      points: 125,
      activityDate: new Date('2026-06-27T07:10:00Z'),
    },
    {
      userId: 'maria.moves',
      type: 'HIIT Circuit',
      durationMinutes: 35,
      points: 110,
      activityDate: new Date('2026-06-27T18:15:00Z'),
    },
    {
      userId: 'dev.cardio',
      type: 'Spin Session',
      durationMinutes: 50,
      points: 135,
      activityDate: new Date('2026-06-28T06:45:00Z'),
    },
    {
      userId: 'nina.lift',
      type: 'Strength Training',
      durationMinutes: 55,
      points: 150,
      activityDate: new Date('2026-06-28T17:40:00Z'),
    },
    {
      userId: 'liam.pace',
      type: 'Trail Hike',
      durationMinutes: 65,
      points: 140,
      activityDate: new Date('2026-06-29T08:30:00Z'),
    },
    {
      userId: 'zoe.stretch',
      type: 'Mobility Flow',
      durationMinutes: 30,
      points: 90,
      activityDate: new Date('2026-06-29T20:05:00Z'),
    },
  ];

  const leaderboard = [
    {
      userId: 'nina.lift',
      username: 'nina.lift',
      teamName: 'Summit Sprinters',
      points: 530,
      rank: 1,
    },
    {
      userId: 'alex.fit',
      username: 'alex.fit',
      teamName: 'Harbor Hustlers',
      points: 490,
      rank: 2,
    },
    {
      userId: 'dev.cardio',
      username: 'dev.cardio',
      teamName: 'Summit Sprinters',
      points: 470,
      rank: 3,
    },
    {
      userId: 'liam.pace',
      username: 'liam.pace',
      teamName: 'Core Commanders',
      points: 445,
      rank: 4,
    },
    {
      userId: 'maria.moves',
      username: 'maria.moves',
      teamName: 'Harbor Hustlers',
      points: 430,
      rank: 5,
    },
    {
      userId: 'zoe.stretch',
      username: 'zoe.stretch',
      teamName: 'Core Commanders',
      points: 395,
      rank: 6,
    },
  ];

  const workouts = [
    {
      title: 'Sea Breeze Endurance',
      focus: 'Cardio',
      difficulty: 'intermediate',
      durationMinutes: 45,
      exercises: ['Warm-up Jog', 'Intervals', 'Cooldown Walk'],
      suggestedFor: ['alex.fit', 'dev.cardio'],
    },
    {
      title: 'Summit Strength Builder',
      focus: 'Strength',
      difficulty: 'advanced',
      durationMinutes: 60,
      exercises: ['Deadlifts', 'Push Press', 'Bulgarian Split Squats'],
      suggestedFor: ['nina.lift', 'liam.pace'],
    },
    {
      title: 'Core Current Flow',
      focus: 'Mobility',
      difficulty: 'beginner',
      durationMinutes: 30,
      exercises: ['Cat-Cow', 'Worlds Greatest Stretch', 'Hip Openers'],
      suggestedFor: ['zoe.stretch', 'maria.moves'],
    },
  ];

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const [insertedTeams, insertedUsers, insertedActivities, insertedLeaderboard, insertedWorkouts] =
    await Promise.all([
      TeamModel.insertMany(teams),
      UserModel.insertMany(users),
      ActivityModel.insertMany(activities),
      LeaderboardModel.insertMany(leaderboard),
      WorkoutModel.insertMany(workouts),
    ]);

  console.log(
    `Seed complete: ${insertedUsers.length} users, ${insertedTeams.length} teams, ${insertedActivities.length} activities, ${insertedLeaderboard.length} leaderboard entries, ${insertedWorkouts.length} workouts`,
  );
}

seedDatabase()
  .then(async () => {
    await mongoose.disconnect();
  })
  .catch(async (error: unknown) => {
    console.error('Seed failed:', error);
    await mongoose.disconnect();
    process.exitCode = 1;
  });
