const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Workout = require('../../models/workout');  

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Workout Model Tests', () => {
  it('should create a new workout with valid data', async () => {
    const workout = new Workout({
      date: new Date(),
      time: '30 minutes',
      name: 'Push-up',
      count: 30,
      comments: 'Great session',
    });

    const savedWorkout = await workout.save();
    expect(savedWorkout.name).toBe('Push-up');
    expect(savedWorkout.count).toBe(30);
  });

  it('should fail when required fields are missing', async () => {
    const workout = new Workout({
      date: new Date(),
      time: '30 minutes',
      name: 'Push-up',
      count: 30,
    });

    await expect(workout.save()).rejects.toThrowError('Workout validation failed');
  });
});
