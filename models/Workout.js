const mongoose = require('mongoose')

const WorkoutSchema = new mongoose.Schema({
    exercise: {
      type: String,
      required: false
    },
    attempts: {
      type: String,
      required: false
    },
    grade: {
      type: String,
      required: false
    },
    angle: {
      type: String,
      required: false
    },
    send: {
      type: String,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //!Change: this field should be required because the app will break if the user is not present.
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
  })

module.exports = mongoose.model('Workout', WorkoutSchema)