
import express from 'express';
import { createInterview, getUserInterviews, updateInterview } from '../controllers/interview.controller.js';
const router = express.Router();

// Schedule a new interview
router.post('/', createInterview);

// Get all interviews for a user
router.get('/:userId', getUserInterviews);

// Get all interviews for jobs posted by an admin (recruiter)
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminInterviews } from '../controllers/interview.controller.js';
router.get('/admin/:adminId', isAuthenticated, getAdminInterviews);

// Update interview status/feedback
router.patch('/:id', updateInterview);

export default router;
