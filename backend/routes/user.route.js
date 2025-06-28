import express from 'express';
import {register,login,updateProfile, logout} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { multiUpload } from '../middlewares/multerFields.js';
import { singleUpload } from '../middlewares/multer.js';
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated, multiUpload, updateProfile);


export default router;