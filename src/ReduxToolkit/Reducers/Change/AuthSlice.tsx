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
        console.log("in");
        return rejectWithValue(res?.response?.data);
      }
      console.log("out");
      
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

export const getRefferer = createAsyncThunk('getRefferer', async (id) => {
  try {
      const res = await api(`/refferal`, "get", false, false, true);
      console.log("res--------", res);
      return res.data.data;
  } catch (err) {
      console.log("err", err);
      throw err;
  }
});

export const getAllUsers = createAsyncThunk('getAllUsers', async (id) => {
  try {
      const res = await api(`/all_users`, "get", false, false, true);
      console.log("res--------", res);
      return res.data.data;
  } catch (err) {
      console.log("err", err);
      throw err;
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      isLoading: false,
      data: null as any | null,
      isError: false,
      errorMessage: "",
    },
    refferer: {
      isLoading: false,
      data: null as any | null,
      isError: false,
      errorMessage: "",
    },
    users: {
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
      console.log("signup rejected", action);
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

    // getRefferer
    builder.addCase(getRefferer.pending, (state, action) => {
      state.refferer.isLoading = true;
    });
    builder.addCase(getRefferer.fulfilled, (state, action) => {
        state.refferer.isLoading = false;
        console.log("action...pa", action.payload);
        state.refferer.data = action.payload;
    });
    builder.addCase(getRefferer.rejected, (state, action) => {
        console.log("error in getRefferer", action.payload);
        state.refferer.isLoading = false;
        state.refferer.isError = true;
    });

    // getAllUsers
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.users.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.users.isLoading = false;
        console.log("action...pa", action.payload);
        state.users.data = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
        console.log("error in getAllUsers", action.payload);
        state.users.isLoading = false;
        state.users.isError = true;
    });
  }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
