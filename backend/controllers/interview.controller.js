import { Job } from '../models/job.model.js';
export const getAdminInterviews = async (req, res) => {
  try {
    const { adminId } = req.params;
    const jobs = await Job.find({ created_by: adminId }, '_id');
    const jobIds = jobs.map(j => j._id);
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

export const createInterview = async (req, res) => {
  try {
    const { applicantId, jobId, date, videoRoomId } = req.body;
    let interview = await Interview.findOne({ applicantId, jobId });
    if (interview) {
      interview.date = date;
      interview.videoRoomId = videoRoomId;
      interview.status = 'Scheduled';
      await interview.save();
      return res.status(200).json(interview);
    } else {
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
