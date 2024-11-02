const ProjectModel = require("../models/Project.js");

const getAll = async (req, res) => {
  try {
    const userId = req.query.userId;

    const projects = await ProjectModel.find({
      $or: [
        { owner: userId },
        { projectManager: userId },
        { members: { $elemMatch: { $eq: userId } } }
      ]
    })
    .populate("owner")
    .populate("projectManager")
    .populate("members")
    .exec();

    if (!projects.length) {
      return res.status(404).json({ message: "Не вдалося знайти проєкти404" });
    }

    res.json(projects);
  } catch (err) {
    console.log("Error in getAll:", err);
    res.status(500).json({
      message: "Не вдалося знайти проєкт500",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await ProjectModel.findById(projectId)
      .populate("owner")
      .populate("projectManager")
      .populate("members");

    if (!project) {
      return res.status(404).json({
        message: "Проєкт не знайдено",
      });
    }

    res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не вдалося знайти проєкт",
    });
  }
};

const remove = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Не вдалося знайти проєкт",
      });
    }
    if (
      project.owner.toString() !== req.userId &&
      project.projectManager.toString() !== req.userId
    ) {
      return res.status(403).json({
        message: "У вас немає прав доступу для видалення цього проєкту",
      });
    }
    await ProjectModel.findByIdAndDelete(projectId);
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не вдалося видалити проєкт",
    });
  }
};

const create = async (req, res) => {
  try {
    const doc = new ProjectModel({
      name: req.body.name,
      description: req.body.description,
      owner: req.userId,
      projectManager: req.body.projectManager,
      members: req.body.members || [],
      color: req.body.color,
    });

    const project = await doc.save();
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося створити проєкт",
    });
  }
};

const update = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Не вдалося знайти проєкт",
      });
    }
    if (
      project.owner.toString() !== req.userId &&
      project.projectManager.toString() !== req.userId
    ) {
      return res.status(403).json({
        message: "У вас немає прав доступу для оновлення цього проєкту",
      });
    }
    await ProjectModel.updateOne(
      { _id: projectId },
      {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status || project.status,
        projectManager: req.body.projectManager || project.projectManager,
        members: req.body.members || project.members,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося змінити проєкт",
    });
  }
};

module.exports = {
  getAll,
  getOne,
  remove,
  create,
  update,
};