const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    name: {
      type: String,
      required: true,
    },
    textTask: {
      type: String,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "new", "not-completed"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "high", "completed"],
      default: "low",
    },
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    filesURL: [{ url: String, fileName: String }],
    comments: [
      {
        text: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
