import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  inPolling: {
    type: Boolean,
    default: false
  },
  votes: {
    up: {
      type: Number,
      default: 0
    },
    down: {
      type: Number,
      default: 0
    }
  }
});

// Prevent duplicate model compilation
const IssueModel = mongoose.models.Issue || mongoose.model('Issue', IssueSchema);

export default IssueModel;
