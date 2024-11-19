const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/User');  

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

describe('User Model Tests', () => {
  it('should create a new user with valid data', async () => {
    const user = new User({
      username: 'vinitha',
      email: 'vinitha@example.com',
      password: 'password123',
    });

    const savedUser = await user.save();
    expect(savedUser.username).toBe('vinitha');
    expect(savedUser.email).toBe('vinitha@example.com');
  });

  it('should fail when required fields are missing', async () => {
    const user = new User({
      email: 'vinitha@example.com',
      password: 'password123',
    });

    await expect(user.save()).rejects.toThrowError('User validation failed');
  });
});
