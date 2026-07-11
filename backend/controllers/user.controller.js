import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUriData from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';
import crypto from 'crypto';
import { sendEmail } from '../utils/email.helper.js';

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

export const googleAuth = async (req, res) => {
    try {
        const role = req.query.role || 'student';
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const callbackUrl = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8000/api/v1/user/auth/google/callback';
        
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&scope=profile%20email&state=${role}`;
        
        return res.redirect(googleAuthUrl);
    } catch (error) {
        console.log(error);
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=${encodeURIComponent('Google auth initiation failed')}`);
    }
}

export const googleCallback = async (req, res) => {
    try {
        const { code, state: role } = req.query;
        if (!code) {
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=${encodeURIComponent('No code received from Google')}`);
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const callbackUrl = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8000/api/v1/user/auth/google/callback';

        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: callbackUrl,
                grant_type: 'authorization_code'
            })
        });

        const tokenData = await tokenResponse.json();
        if (tokenData.error) {
            console.error('Google token exchange error:', tokenData);
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=${encodeURIComponent('Token exchange failed')}`);
        }

        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` }
        });
        const userInfo = await userInfoResponse.json();

        if (!userInfo.email) {
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=${encodeURIComponent('Could not retrieve email from Google')}`);
        }

        let user = await User.findOne({ email: userInfo.email });
        if (!user) {
            user = await User.create({
                fullname: userInfo.name || `${userInfo.given_name} ${userInfo.family_name}`,
                email: userInfo.email,
                googleId: userInfo.sub,
                role: role || 'student',
                profile: {
                    profilePhoto: userInfo.picture || '',
                    bio: '',
                    skills: []
                }
            });
        } else {
            if (!user.googleId) {
                user.googleId = userInfo.sub;
                await user.save();
            }
        }

        const userTokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(userTokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const clientUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        const encodedUser = encodeURIComponent(JSON.stringify(clientUser));
        const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback?token=${token}&user=${encodedUser}`;

        return res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }).redirect(redirectUrl);

    } catch (error) {
        console.error('Google OAuth callback error:', error);
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=${encodeURIComponent('Internal server error during Google authentication')}`);
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email", success: false });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

        await user.save();

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        const message = `
            <div style="font-family: 'Inter', sans-serif; background-color: #0F172A; color: #F8FAFC; padding: 40px 20px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #334155;">
                <h2 style="color: #ffffff; text-align: center; margin-bottom: 24px; font-weight: 700; font-size: 24px;">Reset Your Password</h2>
                <p style="color: #94A3B8; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">You requested a password reset. Please click the button below to choose a new password. This link is valid for 30 minutes.</p>
                <div style="text-align: center; margin-bottom: 32px;">
                    <a href="${resetUrl}" style="background-color: #2563EB; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">Reset Password</a>
                </div>
                <p style="color: #64748B; font-size: 13px; text-align: center; margin: 0;">If you did not request this, please ignore this email.</p>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'TalentNest - Password Reset Request',
                html: message,
            });

            return res.status(200).json({ message: `Reset link sent to your email`, success: true });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            console.error('Mail sending error:', error);
            return res.status(500).json({ message: "Email could not be sent", success: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required", success: false });
        }

        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({ message: "Password reset successful", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};