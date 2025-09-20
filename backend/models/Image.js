//backend/models/image.js

import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true }, // saved filename on disk
  originalName: { type: String }, // original filename from user upload
  path: { type: String, required: true }, // relative path to /uploads
  mimetype: { type: String },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }, // for soft delete
  url: { type: String }, // full URL for cloud or local access
  public_id: { type: String }, // optional, for cloud storage
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
