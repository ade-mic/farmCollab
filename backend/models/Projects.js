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
      default: 0
    },
    currency: {
      type: String,
      required: true
    },
    currentAmount: {
      type: Number,
      default: 0
    },
    creatorId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    participants: [
      {
        userId: {type:  String,  required:true, ref: 'User'},
        amountContributed: {
          type: Number,
          default: 0
        }
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now 
    }
})


const Project = model('Project', ProjectSchema);

export default Project;
