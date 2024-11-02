const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.js");

const register = async (req, res) => {
  try {
    const { email, userName, password, avatarUrl, fullName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email,
      userName,
      fullName,
      avatarUrl,
      passwordHash: hash,
      completedProjectsCount: 0, 
      completedProjectsThisMonth: 0,
      involvedProjectsCount: 0,
      createdOrAdminProjectsCount: 0,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося зареєструвати користувача",
    });
  }
};

const login = async (req, res) => {
  try {
    const { emailOrUserName, password } = req.body;

   const user = await UserModel.findOne({ 
    $or: [{email: emailOrUserName}, {userName: emailOrUserName}],
   });
    if (!user) {
      return res.status(400).json({
        message: "Неправильний логін або пароль",
      });
    }

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неправильний логін або пароль",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося авторизуватись",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Користувача не знайдено",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося авторизуватись",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
