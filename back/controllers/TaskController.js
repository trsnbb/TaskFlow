const TaskModel = require("../models/Task.js");
const ProjectModel = require("../models/Project.js");

const getAll = async (req, res) => {
  const { project_id } = req.params;

  try {
    const tasks = await TaskModel.find({ project_id })
      .populate("assignedUsers")
      .exec();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        message: "Завдань не знайдено для цього проекту.",
      });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не вдалося отримати завдання.",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await TaskModel.findById(taskId)
      .populate("assignedUsers")
      .populate("project_id");

    if (!task) {
      return res.status(404).json({
        message: "Завдання не знайдено",
      });
    }

    res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не вдалося знайти завдання",
    });
  }
};

const create = async (req, res) => {
  try {
    const { project_id } = req.params;

    const { name, textTask, assignedUsers } = req.body;

    const project = await ProjectModel.findById(project_id);
    if (!project) {
      return res.status(404).json({ message: "Проект не знайдено" });
    }
    const doc = new TaskModel({
      project_id: req.params.project_id,
      name: req.body.name,
      textTask: req.body.textTask,
      status: req.body.status || "new",
      priority: req.body.priority || "low",
      assignedUsers: req.body.assignedUsers,
      filesURL: filesURL, 
      comments: req.body.comments,
    });

    const task = await doc.save();
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося створити завдання",
    });
  }
};

const update = async (req, res) => {
  const taskId = req.params.id;

  try {


    let filesURL = [];

    if (req.files && req.files.length > 0) {
      filesURL = req.files.map((file) => ({
        url: `/files/${file.originalname}`,
        fileName: file.originalname,
      }));
    } else if (req.file) {
      filesURL.push({
        url: `/files/${req.file.originalname}`,
        fileName: req.file.originalname,
      });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        $set: {
          project_id: req.params.project_id,
          name: req.body.name,
          textTask: req.body.textTask,
          status: req.body.status,
          priority: req.body.priority,
          assignedUsers: req.body.assignedUsers,
          comments: req.body.comments,
        },
        $push: { filesURL: { $each: filesURL } },
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};



const remove = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await TaskModel.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Не вдалося знайти завдання",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не вдалося видалити завдання",
    });
  }
};

const getUserTasks = async (req, res) => {
  const userId = req.params.userId;

  if (req.userId !== userId) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const tasks = await TaskModel.find({ assignedUsers: userId })
      .populate("assignedUsers")
      .exec();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        message: "No tasks found for this user.",
      });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to retrieve tasks for user.",
    });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getUserTasks,
};
