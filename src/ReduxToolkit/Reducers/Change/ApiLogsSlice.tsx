import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

  // Update the thunk to accept the parameters
export const getMasterDashboardApiLogData = createAsyncThunk(
    'getMasterDashboardApiLogData',
    async () => {
      try {
        const res = await api(`/master-admin/api-logs`, "get", false, false, true);
        console.log("res--------", res);
        return res.data.data;
      } catch (err) {
        console.log("err", err);
        throw err;
      }
    }
  );

// ApiLogs slice
const ApiLogsSlice = createSlice({
  name: "ma_api_logd",
  initialState: {
    masterAdmin: {
        apiLog: {
            isLoading: false,
            data: null as any | null,
            isError: false,
            errorMessage: "",
        },
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    // getMasterDashboardApiLogData
    builder.addCase(getMasterDashboardApiLogData.pending, (state, action) => {
      state.masterAdmin.apiLog.isLoading = true;
    });
    builder.addCase(getMasterDashboardApiLogData.fulfilled, (state, action) => {
        state.masterAdmin.apiLog.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.apiLog.data = action.payload;
    });
    builder.addCase(getMasterDashboardApiLogData.rejected, (state, action) => {
        console.log("error in getMasterDashboardApiLogData", action.payload);
        state.masterAdmin.apiLog.isLoading = false;
        state.masterAdmin.apiLog.isError = true;
    });
  }
});

export const {  } = ApiLogsSlice.actions;
export const ApiLogsReducer = ApiLogsSlice.reducer;
