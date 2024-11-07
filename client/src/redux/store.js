import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./../slices/project";
import taskReducer from "./../slices/task";

const store = configureStore({
  reducer: {
    project: projectReducer,
    tasks: taskReducer,
  },
});

export default store;
