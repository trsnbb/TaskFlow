const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const authMiddleware = require("./authMiddleware.js");
const { loginValidation, registerValidation } = require("./validations/validations.js");
const { UserController, ProjectController, TaskController } = require("./controllers/index.js");
const { projectCreateValidation, taskCreateValidation } = require("./validations/validations.js");
const { checkAuth, handleValidationsErr, checkProjectPermissions } = require("./utils/index.js");


mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://trsnbb:OJb5NRvPrvlJhlMy@taskflow.tpkdk.mongodb.net/projectContr?retryWrites=true&w=majority&appName=TaskFlow")
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "files"); 
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });
const uploadFile = multer({ storage: fileStorage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/files", express.static("files"));

app.post("/login", loginValidation, handleValidationsErr, UserController.login);
app.post("/register", registerValidation, handleValidationsErr, UserController.register);
app.get("/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});


app.get("/project", authMiddleware, ProjectController.getAll);
app.get("/project/:id", authMiddleware, ProjectController.getOne);
app.post("/project", checkAuth, projectCreateValidation, handleValidationsErr, ProjectController.create);
app.delete("/project/:id", checkProjectPermissions, ProjectController.remove);
app.patch("/project/:id", checkProjectPermissions, projectCreateValidation, handleValidationsErr, ProjectController.update);

app.get("/tasks/:userId", authMiddleware, TaskController.getUserTasks);
app.get("/projects/:project_id/tasks", TaskController.getAll);
app.get("/projects/:project_id/task/:id", TaskController.getOne);
app.post("/projects/:project_id/tasks", checkProjectPermissions, taskCreateValidation, handleValidationsErr, TaskController.create);
app.delete("/projects/:project_id/tasks/:id", checkProjectPermissions, TaskController.remove);
app.patch("/projects/:project_id/tasks/:id", checkProjectPermissions, uploadFile.array("files"), taskCreateValidation, TaskController.update);



app.patch("/projects/:project_id/tasks/:id/upload_file", checkProjectPermissions, uploadFile.single("file"), TaskController.update, (req, res) => {
  res.json({ url: `/files/${req.file.filename}` }); 
});

app.listen(5000, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Server is running on http://localhost:5000");
});