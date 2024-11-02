const ProjectModel = require('../models/Project.js');

const checkProjectPermissions = async (req, res, next) => {
  const project_id = req.params.project_id;

  try {

    const project = await ProjectModel.findById(project_id);
    
    if (!project) {
      return res.status(404).json({
        message: "Проект не знайдено",
      });
    }

    if (project.owner.toString() === req.userId || project.projectManager?.toString() === req.userId) {
      return next();
    }

    return res.status(403).json({
      message: "Немає доступу. Ви не є власником або проектним менеджером.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Помилка під час перевірки доступу",
    });
  }
};

module.exports = checkProjectPermissions;