import { createAsyncThunk } from "@reduxjs/toolkit";
import { TasksApi } from "../../api/tasks";

const handle = (thunkApi) => (error) => thunkApi.handleError(error.message);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkApi) => TasksApi.getAllTasks().catch(handle(thunkApi))
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, thunkApi) => TasksApi.addTask(text).catch(handle(thunkApi))
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkApi) =>
    TasksApi.deleteTask(taskId).catch(handle(thunkApi))
);

export const toggleCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async (task, thunkApi) => TasksApi.toggleTask(task).catch(handle(thunkApi))
);
