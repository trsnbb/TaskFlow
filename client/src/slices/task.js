import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (projectId) => {
    const { data } = await axios.get(`/${projectId}/tasks`);
    return data;
  }
);

export const fetchTasksForUser = createAsyncThunk(
  "tasks/fetchTasksForUser",
  async (userId) => {
    const { data } = await axios.get(`/tasks/${userId}`);
    return data;
  }
);

export const fetchSingleTask = createAsyncThunk(
  "tasks/fetchSingleTask",
  async (taskId) => {
    const { data } = await axios.get(`/tasks/${taskId}`);
    return data;
  }
);

const initialState = {
  tasks: {
    items: [],
    userTasks: [],
    status: "idle",
    singleTask: null,
    singleTaskStatus: "idle",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { taskId, targetColumnId } = action.payload;
      const task = state.tasks.items.find((t) => t._id === taskId);
      if (task) {
        task.status = targetColumnId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.tasks.items = [];
        state.tasks.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks.items = action.payload;
        state.tasks.status = "loaded";
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.tasks.items = [];
        state.tasks.status = "error";
      })
      .addCase(fetchTasksForUser.pending, (state) => {
        state.tasks.userTasks = [];
        state.tasks.status = "loading";
      })
      .addCase(fetchTasksForUser.fulfilled, (state, action) => {
        state.tasks.userTasks = action.payload;
        state.tasks.status = "loaded";
      })
      .addCase(fetchTasksForUser.rejected, (state) => {
        state.tasks.userTasks = [];
        state.tasks.status = "error";
      })
      .addCase(fetchSingleTask.pending, (state) => {
        state.tasks.singleTask = null;
        state.tasks.singleTaskStatus = "loading";
      })
      .addCase(fetchSingleTask.fulfilled, (state, action) => {
        state.tasks.singleTask = action.payload;
        state.tasks.singleTaskStatus = "loaded";
      })
      .addCase(fetchSingleTask.rejected, (state) => {
        state.tasks.singleTask = null;
        state.tasks.singleTaskStatus = "error";
      });
  },
});

export const selectAllTasks = (state) => state.tasks.tasks.items;
export const selectUserTasks = (state) => state.tasks.tasks.userTasks; 

export const { moveTask } = taskSlice.actions;

export default taskSlice.reducer;
