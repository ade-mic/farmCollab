import mongoose from "mongoose";
import { randomUUID } from 'crypto';
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { Schema,  model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Farmer', 'Buyer', 'Distributor', 'NGO' ],
    default: 'Farmer'
  },
  profile: {
    profilePicture:
    { type: String },
    farmName: {
      type: String,
    },
    location: {
      type: String
    },
    contactNumber: {
      type: String
    }
  },
  createdAt: {
  type: Date,
  default: Date.now
}  
})

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 12)
  }
  next()
})

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  // Check if the password field is being updated
  if (update && update.password) {
    const hashedPassword = await bcrypt.hash(update.password, 12);
    this.setUpdate({ ...update, password: hashedPassword });
  }

  next();
});


UserSchema.methods.comparePassword = async function (enterPassword) {
  return bcrypt.compareSync(enterPassword, this.password)
}

UserSchema.methods.jwtToken = function () {
  const user = this
  return jwt.sign({ id: user._id, role: user.role }, process.env.SECRETKEY, {
    expiresIn: '1h',
  })
}

const User = model('User', UserSchema)

export default User;
