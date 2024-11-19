const mongoose = require('mongoose');


const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  }
}, {
  timestamps: true 
});


module.exports = mongoose.model('Workout', workoutSchema);
