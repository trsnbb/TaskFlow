import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async (userId) => {
    const { data } = await axios.get(`/project?userId=${userId}`);
    return data;
  }
);

export const fetchSingleProject = createAsyncThunk(
  "project/fetchSingleProject",
  async (projectId) => {
    const { data } = await axios.get(`/project/${projectId}`);
    return data;
  }
);

const initialState = {
  project: {
    items: [],
    status: "idle",
    singleProject: null,
    singleProjectStatus: "idle",
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    renameProject: (state, action) => {
      const { id, name } = action.payload;
      if (
        state.project.singleProject &&
        state.project.singleProject._id === id
      ) {
        state.project.singleProject.name = name;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.project.items = [];
        state.project.status = "loading";
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.project.items = action.payload;
        state.project.status = "loaded";
      })
      .addCase(fetchProject.rejected, (state) => {
        state.project.items = [];
        state.project.status = "error";
      })
      .addCase(fetchSingleProject.pending, (state) => {
        state.project.singleProject = null;
        state.project.singleProjectStatus = "loading";
      })
      .addCase(fetchSingleProject.fulfilled, (state, action) => {
        state.project.singleProject = action.payload;
        state.project.singleProjectStatus = "loaded";
      })
      .addCase(fetchSingleProject.rejected, (state) => {
        state.project.singleProject = null;
        state.project.singleProjectStatus = "error";
      });
  },
});

export const { renameProject } = projectSlice.actions;

export default projectSlice.reducer;
