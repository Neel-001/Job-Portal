import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUriData from '../utils/datauri.js';

import cloudinary from '../utils/cloudinary.js';
export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        };
        const file = req.file; 
        if(!file){
            return res.status(400).json({ message: "Profile photo is required", success: false });
        }
        const fileUri = getUriData(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already existed with this email",
                success: false,
            })
        }
        const hahshedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            password: hahshedPassword,
            phoneNumber,
            role,
            profile:{
                profilePhoto : cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        };
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        };
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with this role",
                success: false,
            })
        };
        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        return res.status(200).cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none', // Allow cross-site cookies
            secure: true      // Only send cookie over HTTPS
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }).json({
            message: "Logged out successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',');
        }
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User Not found",
                success: false,
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        // Handle files
        if (req.files) {
            // Profile Photo
            if (req.files.profilePhoto && req.files.profilePhoto[0]) {
                const profilePhotoFile = req.files.profilePhoto[0];
                const profilePhotoUri = getUriData(profilePhotoFile);
                const profilePhotoCloud = await cloudinary.uploader.upload(profilePhotoUri.content);
                user.profile.profilePhoto = profilePhotoCloud.secure_url;
            }
            // Resume
            if (req.files.resume && req.files.resume[0]) {
                const resumeFile = req.files.resume[0];
                const resumeUri = getUriData(resumeFile);
                const resumeCloud = await cloudinary.uploader.upload(resumeUri.content);
                user.profile.resume = resumeCloud.secure_url;
                user.profile.resumeOriginalName = resumeFile.originalname;
            }
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}