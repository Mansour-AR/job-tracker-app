import express from 'express';
import Application from '../models/Application.js';
import mongoose from 'mongoose';

const router = express.Router();

// Simple middleware to check if userId is provided
const checkUserId = (req, res, next) => {
  const userId = req.query.userId || req.body.userId;
  if (!userId) {
    return res.status(401).json({ 
      error: 'User ID required',
      message: 'User ID is required for this operation. Add ?userId=your-user-id to the URL or provide userId in the request body.',
      example: '/jobs?userId=your-user-id'
    });
  }
  req.userId = userId;
  next();
};

// CREATE
router.post('/', checkUserId, async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      userId: req.userId
    });
    
    res.status(201).json(application);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        message: err.message,
        details: Object.keys(err.errors).map(key => ({
          field: key,
          message: err.errors[key].message
        }))
      });
    }
    
    res.status(400).json({ error: err.message });
  }
});

// READ ALL (for current user)
router.get('/', checkUserId, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.userId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DEBUG: Check database contents
router.get('/debug', async (req, res) => {
  try {
    const allJobs = await Application.find({});
    const dbName = mongoose.connection.db.databaseName;
    
    res.json({
      database: dbName,
      totalJobs: allJobs.length,
      jobs: allJobs,
      message: 'All jobs in database'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TEST: Create a sample job for testing
router.post('/test-create', async (req, res) => {
  try {
    const testJob = await Application.create({
      title: 'Software Engineer',
      company: 'Tech Corp',
      status: 'Applied',
      userId: 'test-user-123',
      notes: 'This is a test job created for testing purposes',
      jobUrl: 'https://example.com/job'
    });
    
    res.status(201).json({
      message: 'Test job created successfully',
      job: testJob
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', checkUserId, async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!application) return res.status(404).json({ error: 'Not found' });
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', checkUserId, async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!application) return res.status(404).json({ error: 'Not found' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// STATS - Get job statistics for authenticated user
router.get('/stats', checkUserId, async (req, res) => {
  try {
    // Count jobs by status for the current user
    const stats = await Application.aggregate([
      { $match: { userId: req.userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Convert to a more readable format
    const statusCounts = {};
    let totalJobs = 0;
    
    stats.forEach(stat => {
      statusCounts[stat._id] = stat.count;
      totalJobs += stat.count;
    });
    
    // Ensure all statuses are represented (even if count is 0)
    const allStatuses = ['Applied', 'Interview Scheduled', 'Interviewed', 'Offer Received', 'Rejected', 'Archived'];
    allStatuses.forEach(status => {
      if (!statusCounts[status]) {
        statusCounts[status] = 0;
      }
    });
    
    // Calculate active applications (jobs that are not rejected or archived)
    const activeApplications = totalJobs - (statusCounts['Rejected'] || 0) - (statusCounts['Archived'] || 0);
    
    // Calculate success rate (offers received / total jobs * 100)
    const offersReceived = statusCounts['Offer Received'] || 0;
    const successRate = totalJobs > 0 ? Math.round((offersReceived / totalJobs) * 100) : 0;
    
    // Create summary object
    const summary = {
      totalJobs,
      activeApplications,
      successRate,
      statusCounts,
      userId: req.userId,
      timestamp: new Date().toISOString()
    };
    
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;