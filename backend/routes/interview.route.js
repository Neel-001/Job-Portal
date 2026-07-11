import express from 'express';
import { createInterview, getUserInterviews, updateInterview, getAdminInterviews } from '../controllers/interview.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/', isAuthenticated, createInterview);
router.get('/:userId', isAuthenticated, getUserInterviews);
router.get('/admin/:adminId', isAuthenticated, getAdminInterviews);
router.patch('/:id', isAuthenticated, updateInterview);

export default router;
