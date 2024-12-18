import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProjectSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    goalAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true
    },
    currentAmount: {
      type: Number,
    },
    creatorId: {
      type: String,
      ref: 'User',
      required: true,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: {
      type: Date,
      default: Date.now 
    }
})


const Project = model('Project', ProjectSchema);

export default Project;
