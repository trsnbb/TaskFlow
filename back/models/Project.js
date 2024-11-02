const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    color:{
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["in progress", "completed", "on hold"],  
      default: "in progress"
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    projectManager:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    deadline:{
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
