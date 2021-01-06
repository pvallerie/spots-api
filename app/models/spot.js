const mongoose = require('mongoose')

const spotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Spot', spotSchema)
