import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Infrastructure', 'Safety', 'Environmental', 'Other'], // customize as needed
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
  },
  attachments: [{
    url: String,
    type: String,
    filename: String,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  votes: {
    up: { type: Number, default: 0 },
    down: { type: Number, default: 0 },
  },
  inPolling: {
    type: Boolean,
    default: false,
  },
  comments: [{
    text: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
