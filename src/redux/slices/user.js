import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", userData);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/logout");
      delete axios.defaults.headers.common.Authorization;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/current",
  async (_, thunkAPI) => {
    const token = axios.defaults.headers.common.Authorization;
    if (!token) return thunkAPI.rejectWithValue("Brak tokenu autoryzacji");

    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Rejestracja nie powiodła się";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Logowanie nie powiodło się";
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Błąd podczas wylogowywania";
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Błąd podczas pobierania danych użytkownika";
      });
  },
});

// Eksportuj `userReducer`
export const userReducer = userSlice.reducer;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer; // również zachowujemy domyślny eksport
