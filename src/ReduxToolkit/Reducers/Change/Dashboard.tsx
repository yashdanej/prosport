import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

// Thunk for createToken
export const getApiLogs = createAsyncThunk('getApiLogs', async (id) => {
    try {
        const res = await api(`/dashboard/api_key`, "get", false, false, true);
        console.log("res--------", res);
        return res.data.data;
    } catch (err) {
        console.log("err", err);
        throw err;
    }
});

export const getApiLogsUser = createAsyncThunk('getApiLogsUser', async (id) => {
  try {
      const res = await api(`/dashboard/api_log_user`, "get", false, false, true);
      console.log("res--------", res);
      return res.data.data;
  } catch (err) {
      console.log("err", err);
      throw err;
  }
});

// Define the type of dispatch that includes Thunks
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

// Auth slice
const dashboardSlice = createSlice({
  name: "token",
  initialState: {
    api_logs: {
      isLoading: false,
      data: null as any | null,
      isError: false,
      errorMessage: "",
    },
    logs: {
      isLoading: false,
      data: null as any | null,
      isError: false,
      errorMessage: "",
    }
  },
  reducers: {
    // Add any reducers if needed
  },
  extraReducers: (builder) => {
    // getApiLogs
    builder.addCase(getApiLogs.pending, (state, action) => {
        state.api_logs.isLoading = true;
    });
    builder.addCase(getApiLogs.fulfilled, (state, action) => {
        state.api_logs.isLoading = false;
        console.log("action...pa", action.payload);
        state.api_logs.data = action.payload;
    });
    builder.addCase(getApiLogs.rejected, (state, action) => {
        console.log("error in getApiLogs", action.payload);
        state.api_logs.isLoading = false;
        state.api_logs.isError = true;
    });

    // getApiLogsUser
    builder.addCase(getApiLogsUser.pending, (state, action) => {
      state.logs.isLoading = true;
    });
    builder.addCase(getApiLogsUser.fulfilled, (state, action) => {
        state.logs.isLoading = false;
        console.log("action...pa", action.payload);
        state.logs.data = action.payload;
    });
    builder.addCase(getApiLogsUser.rejected, (state, action) => {
        console.log("error in getApiLogsUser", action.payload);
        state.logs.isLoading = false;
        state.logs.isError = true;
    });
  }
});

export const dashboardReducer = dashboardSlice.reducer;
