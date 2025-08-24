
import express from 'express';
import { createInterview, getUserInterviews, updateInterview } from '../controllers/interview.controller.js';
const router = express.Router();

router.post('/', createInterview);


router.get('/:userId', getUserInterviews);


import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminInterviews } from '../controllers/interview.controller.js';
router.get('/admin/:adminId', isAuthenticated, getAdminInterviews);


router.patch('/:id', updateInterview);

export default router;
