const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName:{
      type: String,
      required: true,
    },
  
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    completedProjectsCount: {
      type: Number,
      default: 0,
    },
    completedProjectsThisMonth: {
      type: Number,
      default: 0,
    },
    involvedProjectsCount: {
      type: Number,
      default: 0,
    },
    createdOrAdminProjectsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
