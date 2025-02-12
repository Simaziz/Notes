import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

// Check if the model already exists to avoid redefining it
const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

export default Note;