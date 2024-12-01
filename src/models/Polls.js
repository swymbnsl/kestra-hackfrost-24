const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [
    {
      optionText: {
        type: String,
        required: true,
        trim: true
      },
      votes: {
        type: Number,
        default: 0
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

// Middleware to update the updatedAt field on save
PollSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Poll model
const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;
