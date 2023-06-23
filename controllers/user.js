import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendcookie } from "../routes/utils/features.js";

export const getallusers = async (req, res) => {};
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res.status(404).json({
        success: false,
        message: "user Already exist ",
      });
    const hashedpassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedpassword });
    sendcookie(user, res, "Registered", 201);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};
export const getmyprofile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid email or password ",
    });
  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch)
    return res.status(404).json({
      success: false,
      message: "invalid email || password   ",
    });
  sendcookie(user, res, `welcome back,${user.name}`, 200);
};
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      user: req.user,
    });
};
