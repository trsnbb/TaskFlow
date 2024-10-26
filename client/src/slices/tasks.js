import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../axios";

export const fetchTask = createAsyncThunk("project/fetchTask", async () => {
  const { data } = await axios.get("/project");
  return data;
});

const initialState = {
  tasks: {
    items: [],
    status: "loading",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.tasks.items = []; // Changed from state.post to state.tasks
        state.tasks.status = "loading";
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.tasks.items = action.payload; // Changed from state.post to state.tasks
        state.tasks.status = "loaded";
      })
      .addCase(fetchTask.rejected, (state) => {
        state.tasks.items = []; // Changed from state.post to state.tasks
        state.tasks.status = "error";
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
