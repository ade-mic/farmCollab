import mongoose from "mongoose";
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

// Profile Subdocument Schema
const ProfileSchema = new Schema({
  profilePicture: { type: String },
  farmName: { type: String },
  location: { type: String },
  contactNumber: { type: String },
});

// Main User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Farmer', 'Buyer', 'Distributor', 'NGO'],
    default: 'Farmer',
  },
  profile: ProfileSchema, // Use Profile Schema
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash Password Before Save
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Hash Password on Update
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  // Check if the password field is being updated
  if (update && update.password) {
    const hashedPassword = await bcrypt.hash(update.password, 12);
    this.setUpdate({ ...update, password: hashedPassword });
  }

  next();
});

// Compare Password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
UserSchema.methods.jwtToken = function () {
  const user = this;
  if (!process.env.SECRETKEY) {
    throw new Error("SECRETKEY is not defined in the environment variables");
  }
  return jwt.sign({ id: user._id, role: user.role }, process.env.SECRETKEY, {
    expiresIn: '52h',
  });
};

const User = model('User', UserSchema);

export default User;
