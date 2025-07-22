import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js'; 
import applicationRoute from './routes/application.route.js';
import path from 'path';
import interviewRoute from './routes/interview.route.js';
 
dotenv.config({});  
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:5173', 'https://talent-nest-384p.onrender.com'],
    credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;



app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);
app.use('/api/v1/interview', interviewRoute);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})