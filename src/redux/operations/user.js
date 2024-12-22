import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../../api/auth";

const handle = (thunkApi) => (error) => thunkApi.handleError(error.message);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, password }, thunkApi) =>
    AuthApi.register({ email, password }).catch(handle(thunkApi))
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkApi) =>
    AuthApi.login({ email, password }).catch(handle(thunkApi))
);

export const logoutUser = createAsyncThunk("user/logout", async (_, thunkApi) =>
  AuthApi.logout().catch(handle(thunkApi))
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, thunkApi) => AuthApi.getCurrentUser().catch(handle(thunkApi))
);
