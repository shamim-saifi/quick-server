import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmailForContact from "../middleware/sendEmailForContact.js";

export const Signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Your have done Registration. Please Login",
      });
    }

    const hasPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, phone, password: hasPassword });
    const token = jwt.sign({ _id: user._id }, process.env.JWT);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .json({
        success: true,
        message: "Registration has completed",
        user,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email and Password Invalid. Try Again",
      });
    }

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return res.status(400).json({
        success: false,
        message: "Email and Password Invalid. Try Again",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .json({
        success: true,
        message: `Welcome ${user.name}`,
        user,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logout Done",
        // user: req.user, 15-12-23
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetFormData = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const Contact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const text = `Hi, My name is ${name}\n Email - ${email}\n Phone Number - ${phone} \n\n ${message}`;

    const SENDER_EMAIL = process.env.SMTP_SENDER_EMAIL;
    sendEmailForContact(text, SENDER_EMAIL, "Contact from invoice");

    res.status(200).json({
      success: true,
      message: "Message has been send",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not Found. Try Again",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.ResetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.ResetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save(); 

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    const text = `Hi, reset your password \n\n ${url} `;
    sendEmailForContact(text, email, "Re-Set your password");

    res.status(200).json({
      success: true,
      message: `Mail has been send to your email ${user.email}`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    }); 
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const ResetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    let user = await User.findOne({
      ResetPasswordToken,
      ResetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "token has been expire",
      });
    }

    const hasPassword = await bcrypt.hash(req.body.password, 10);
    user.password=hasPassword;
    user.ResetPasswordExpire=undefined;
    user.ResetPasswordToken=undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Password has been update `,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
