const { body } = require("express-validator");

const loginValidation = [
  body("emailOrUserName", "Неправильний формат пошти або ім'я користувача").isString().notEmpty(),
  body("password", "Занадто коротко (мін 5 символів)").isLength({ min: 5 }),
];

const registerValidation = [
  body("userName", "Ім'я користувача не може бути пустим").isString().isLength({ min: 3 }),
  body("email", "Неправильний формат пошти").isEmail(),
  body("password", "Занадто коротко (мін 5 символів)").isLength({ min: 5 }),
  body("avatarUrl", "Невірне посилання на аватар").optional().isURL(),
  body("fullName").isString()
];

const projectCreateValidation = [
  body("name", "Введіть назву").isLength({ min: 3 }).isString(),
  body("description", "Введіть опис").isLength({ min: 5 }).isString(),
  body("status", "Невірний статус").optional().isIn(["in progress", "completed", "on hold"]),
  body("members", "Невірний формат членів проєкту (вкажіть масив)").optional().isArray(),
  body("projectManager", "Невірний формат менеджера проєкту").optional().isMongoId(),
];

const taskCreateValidation = [
  body("name", "Назва завдання повинна бути не менше 3 символів").isString().isLength({ min: 3 }),
  body("textTask", "Опис завдання повинен бути не менше 5 символів").optional().isString().isLength({ min: 5 }),
  body("assignedUsers", "Невірний формат користувачів (вкажіть масив)").optional().isArray(),
  body("status", "Невірний статус").optional().isIn(["in-progress", "completed", "new"]),
  body("priority", "Невірний пріоритет").optional().isIn(["low", "high", "completed"]),
  body("filesURL", "Невірний формат URL файлів").optional().isObject().custom(value => {
    if (!value.url || !value.fileName) {
      throw new Error('filesURL повинно містити поля url і fileName');
    }
    return true;
  }),
  body("comments", "Невірний формат коментарів").optional().isArray(),
];
module.exports = {
  loginValidation,
  registerValidation,
  projectCreateValidation,
  taskCreateValidation
};
