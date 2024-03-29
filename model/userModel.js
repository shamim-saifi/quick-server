import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter your name"], 
  },
  email: {
    type: String,
    unique: true,
    required: [true, "enter your email"],
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    select: false,
    required: [true, "enter your password"],
  },
  ResetPasswordToken:String,
  ResetPasswordExpire:String,
});

export const User = mongoose.model("user", userSchema);
