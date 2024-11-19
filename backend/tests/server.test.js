const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userroute');
const workoutRoutes = require('../routes/workoutroute');


let mongoServer;
let app;

beforeAll(async () => {
 
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  
  app = express();
  
 
  app.use(cors());
  app.use(bodyParser.json());

  
  app.use('/api/userroute', userRoutes);
  app.use('/api/workouts', workoutRoutes);

  
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('API Routes Integration Tests', () => {
  describe('User Routes', () => {
    it('should create a new user and return the user object', async () => {
      const userData = {
        username: 'vinitha',
        email: 'vinitha@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/userroute')
        .send(userData);

      expect(response.status).toBe(201);  
      expect(response.body).toHaveProperty('_id');
      expect(response.body.username).toBe(userData.username);
      expect(response.body.email).toBe(userData.email);
    });

    it('should return all users', async () => {
      const response = await request(app)
        .get('/api/userroute');

      expect(response.status).toBe(200);  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);  
    });
  });

  describe('Workout Routes', () => {
    it('should create a new workout and return the workout object', async () => {
      const workoutData = {
        date: new Date(),
        time: '30 minutes',
        name: 'Push-up',
        count: 30,
        comments: 'Great session',
      };

      const response = await request(app)
        .post('/api/workouts')
        .send(workoutData);

      expect(response.status).toBe(201);  
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(workoutData.name);
      expect(response.body.count).toBe(workoutData.count);
    });

    it('should return all workouts', async () => {
      const response = await request(app)
        .get('/api/workouts');

      expect(response.status).toBe(200);  
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0); 
    });
  });
});
