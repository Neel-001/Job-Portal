import express from 'express';
import {register,login,updateProfile, logout, googleAuth, googleCallback, forgotPassword, resetPassword} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { multiUpload } from '../middlewares/multerFields.js';
import { singleUpload } from '../middlewares/multer.js';
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated, multiUpload, updateProfile);

router.route("/auth/google").get(googleAuth);
router.route("/auth/google/callback").get(googleCallback);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);

export default router;