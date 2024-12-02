const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');  
const userRoutes = require('./routes/userroute');
const workoutRoutes = require('./routes/workoutroute');  
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/userroute', userRoutes);
app.use('/api/workouts', workoutRoutes); 

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
