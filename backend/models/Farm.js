import mongoose from "mongoose";
const { Schema, model } = mongoose;

const FarmSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  location: {
    latitude: { type: Number, required: true }, 
    longitude: { type: Number, required: true },
  },
  size: {
    type: Number,
    required: true
  },
  soilType: {
    type: String
  },
  cropsGrown: {
    type: [String]
  },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
  isAvailableForPooling: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }, // Timestamp for creation
});

const Farm = model('Farm', FarmSchema);

export default Farm;
