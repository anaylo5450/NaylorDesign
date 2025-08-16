import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
