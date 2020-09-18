const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title.'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please add a description.'],
  },
})

const Note = mongoose.models.Note || mongoose.model('Note', notesSchema)

module.exports = Note
