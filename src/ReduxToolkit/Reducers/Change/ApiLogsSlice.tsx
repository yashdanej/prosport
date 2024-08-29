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

export const getMasterDashboardAllUsersData = createAsyncThunk(
  'getMasterDashboardAllUsersData',
  async () => {
    try {
      const res = await api(`/master-admin/users-token`, "get", false, false, true);
      console.log("res--------", res);
      return res.data.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }
);

export const getMasterDashboardUsersInvoicesData = createAsyncThunk(
  'getMasterDashboardUsersInvoicesData',
  async () => {
    try {
      const res = await api(`/master-admin/invoice-paid-unpaid`, "get", false, false, true);
      console.log("res--------", res);
      return res.data.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }
);

export const getMasterDashboardPlansData = createAsyncThunk(
  'getMasterDashboardPlansData',
  async () => {
    try {
      const res = await api(`/master-admin/get-plans`, "get", false, false, true);
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
        allUsers: {
          isLoading: false,
          data: null as any | null,
          isError: false,
          errorMessage: "",
        },
        usersInvoice: {
          isLoading: false,
          data: null as any | null,
          isError: false,
          errorMessage: "",
        },
        plans: {
          isLoading: false,
          data: null as any | null,
          isError: false,
          errorMessage: "",
        }
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

    // getMasterDashboardAllUsersData
    builder.addCase(getMasterDashboardAllUsersData.pending, (state, action) => {
      state.masterAdmin.allUsers.isLoading = true;
    });
    builder.addCase(getMasterDashboardAllUsersData.fulfilled, (state, action) => {
        state.masterAdmin.allUsers.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.allUsers.data = action.payload;
    });
    builder.addCase(getMasterDashboardAllUsersData.rejected, (state, action) => {
        console.log("error in getMasterDashboardAllUsersData", action.payload);
        state.masterAdmin.allUsers.isLoading = false;
        state.masterAdmin.allUsers.isError = true;
    });

    // getMasterDashboardUsersInvoicesData
    builder.addCase(getMasterDashboardUsersInvoicesData.pending, (state, action) => {
      state.masterAdmin.usersInvoice.isLoading = true;
    });
    builder.addCase(getMasterDashboardUsersInvoicesData.fulfilled, (state, action) => {
        state.masterAdmin.usersInvoice.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.usersInvoice.data = action.payload;
    });
    builder.addCase(getMasterDashboardUsersInvoicesData.rejected, (state, action) => {
        console.log("error in getMasterDashboardUsersInvoicesData", action.payload);
        state.masterAdmin.usersInvoice.isLoading = false;
        state.masterAdmin.usersInvoice.isError = true;
    });

     // getMasterDashboardPlansData
     builder.addCase(getMasterDashboardPlansData.pending, (state, action) => {
      state.masterAdmin.plans.isLoading = true;
    });
    builder.addCase(getMasterDashboardPlansData.fulfilled, (state, action) => {
        state.masterAdmin.plans.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.plans.data = action.payload;
    });
    builder.addCase(getMasterDashboardPlansData.rejected, (state, action) => {
        console.log("error in getMasterDashboardPlansData", action.payload);
        state.masterAdmin.plans.isLoading = false;
        state.masterAdmin.plans.isError = true;
    });
  }
});

export const {  } = ApiLogsSlice.actions;
export const ApiLogsReducer = ApiLogsSlice.reducer;
