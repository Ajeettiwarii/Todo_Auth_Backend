import express from "express";
import { User } from "../models/user.js";
import {
  getallusers,
//   getuserdetail,
  register,
  login,
  getmyprofile, 
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.get("/all", getallusers);
router.post("/new", register);
router.post("/login", login); 
router.get("/logout",logout);
router.get("/me",isAuthenticated, getmyprofile); 


export default router;
