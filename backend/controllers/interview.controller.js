import { Job } from '../models/job.model.js';
// Get all interviews for jobs posted by an admin (recruiter)
export const getAdminInterviews = async (req, res) => {
  try {
    const { adminId } = req.params;
    // Find all jobs posted by this admin
    const jobs = await Job.find({ created_by: adminId }, '_id');
    const jobIds = jobs.map(j => j._id);
    // Find all interviews for these jobs
    const interviews = await Interview.find({ jobId: { $in: jobIds } })
      .populate('applicantId')
      .populate('jobId')
      .sort({ date: 1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import Interview from '../models/interview.model.js';

// Schedule a new interview
export const createInterview = async (req, res) => {
  try {
    const { applicantId, jobId, date, videoRoomId } = req.body;
    // Check if an interview already exists for this applicant and job
    let interview = await Interview.findOne({ applicantId, jobId });
    if (interview) {
      // Update the existing interview
      interview.date = date;
      interview.videoRoomId = videoRoomId;
      interview.status = 'Scheduled';
      await interview.save();
      return res.status(200).json(interview);
    } else {
      // Create a new interview
      interview = await Interview.create({
        applicantId,
        jobId,
        date,
        videoRoomId,
        status: 'Scheduled',
      });
      return res.status(201).json(interview);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all interviews for a user (applicant or admin)
export const getUserInterviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const interviews = await Interview.find({ applicantId: userId })
      .populate('jobId')
      .sort({ date: 1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update interview status/feedback
export const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, feedback } = req.body;
    const interview = await Interview.findByIdAndUpdate(
      id,
      { status, feedback },
      { new: true }
    );
    res.json(interview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
