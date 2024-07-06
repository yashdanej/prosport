import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

// Thunk for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (data: { name: string; email: string; password: string; reffer_code?: string | undefined}, { rejectWithValue }) => {
    try {
      console.log("signup---------", data);
      const res = await api(`/signup`, "post", data, false, false);
      console.log("res---", res);
      if (!res?.data?.success) {
        return rejectWithValue(res?.data?.message);
      }
      return res?.data;
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.message);
    }
  }
);

// Define the type of dispatch that includes Thunks
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

// Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api(`/login`, "post", data, false, false);
      console.log("res", res);
      if (!res?.data?.success) {
        return rejectWithValue(res?.data?.message);
      }
      return res?.data;
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      isLoading: false,
      data: null as any | null,
      isError: false,
      errorMessage: "",
    }
  },
  reducers: {
    // Add any reducers if needed
    logout: (state) => {
      state.user.data = null;
    }
  },
  extraReducers: (builder) => {
    // Handle signup
    builder.addCase(signup.pending, (state) => {
      state.user.isLoading = true;
      state.user.isError = false;
      state.user.errorMessage = "";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("signup fulfilled", action.payload);
      state.user.data = action.payload;
      state.user.isLoading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log("signup rejected", action.payload);
      state.user.isLoading = false;
      state.user.isError = true;
      state.user.errorMessage = action.payload as string;
    });

    // Handle login
    builder.addCase(login.pending, (state) => {
      state.user.isLoading = true;
      state.user.isError = false;
      state.user.errorMessage = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login fulfilled", action.payload);
      state.user.data = action.payload;
      state.user.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("login rejected", action.payload);
      state.user.isLoading = false;
      state.user.isError = true;
      state.user.errorMessage = action.payload as string;
    });
  }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
