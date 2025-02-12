import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Check if the model already exists to avoid redefining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;