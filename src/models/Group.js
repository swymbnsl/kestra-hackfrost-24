// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate model compilation
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
