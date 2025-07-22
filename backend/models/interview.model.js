
import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Feedback Given'], default: 'Scheduled' },
  result: { type: String, enum: ['Pending', 'Selected', 'Offered', 'Rejected'], default: 'Pending' },
  videoRoomId: { type: String, required: true },
  feedback: { type: String }
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
