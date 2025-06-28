const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Get all jobs for a specific user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('🔍 Jobs GET: User ID from query:', userId);
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const jobs = await Application.find({ userId });
    console.log('✅ Jobs GET: Found jobs count:', jobs.length);
    
    res.json({ jobs });
  } catch (error) {
    console.error('❌ Jobs GET Error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  try {
    const { userId, ...jobData } = req.body;
    console.log('🔍 Jobs POST: Creating job for user:', userId);
    console.log('🔍 Jobs POST: Job data:', jobData);
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const job = new Application({
      ...jobData,
      userId
    });
    
    const savedJob = await job.save();
    console.log('✅ Jobs POST: Job created successfully:', savedJob._id);
    
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('❌ Jobs POST Error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Update a job
router.put('/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('🔍 Jobs PUT: Updating job:', req.params.id, 'for user:', userId);
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const job = await Application.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!job) {
      console.log('❌ Jobs PUT: Job not found or unauthorized');
      return res.status(404).json({ error: 'Job not found' });
    }
    
    console.log('✅ Jobs PUT: Job updated successfully');
    res.json(job);
  } catch (error) {
    console.error('❌ Jobs PUT Error:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('🔍 Jobs DELETE: Deleting job:', req.params.id, 'for user:', userId);
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const job = await Application.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!job) {
      console.log('❌ Jobs DELETE: Job not found or unauthorized');
      return res.status(404).json({ error: 'Job not found' });
    }
    
    console.log('✅ Jobs DELETE: Job deleted successfully');
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('❌ Jobs DELETE Error:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

module.exports = router; 