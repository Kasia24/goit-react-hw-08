import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../operations/user";

const onPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const onError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const userSlice = createSlice({
  name: "user",

  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, onPending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, onError)

      .addCase(loginUser.pending, onPending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, onError)

      .addCase(logoutUser.pending, onPending)
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, onError)

      .addCase(getCurrentUser.pending, onPending)
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, onError);
  },

  selectors: {
    selectCurrentUser: (state) => state.currentUser,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});

export const { selectCurrentUser, selectIsLoading, selectError } =
  userSlice.selectors;

export const userReducer = userSlice.reducer;
