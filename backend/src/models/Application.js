import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  // Required fields
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxLength: 100
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxLength: 100
  },
  status: {
    type: String,
    required: true,
    enum: ['Applied', 'Interview Scheduled', 'Interviewed', 'Offer Received', 'Rejected', 'Archived'],
    default: 'Applied',
    index: true
  },
  // Changed for Auth0 - stores the Auth0 user ID as string
  userId: {
    type: String,
    required: true,
    index: true
  },

  // Optional fields
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  notes: {
    type: String,
    trim: true,
    maxLength: 2000
  },
  jobUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  autoIndex: true
});

// Text index for search
applicationSchema.index(
  { title: 'text', company: 'text', notes: 'text' },
  {
    weights: { title: 3, company: 2, notes: 1 },
    name: 'applicationsTextIndex'
  }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;