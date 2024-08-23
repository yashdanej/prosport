import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

// Define an interface for the parameters
interface FetchParams {
    from?: string;
    to?: string;
  }
  
  // Update the thunk to accept the parameters
  export const getMasterDashboardData = createAsyncThunk(
    'getMasterDashboardData',
    async ({ from, to }: FetchParams) => {
      try {
        // Include the date parameters in the query string
        const res = await api(`/master-admin?from=${from}&to=${to}`, "get", false, false, true);
        console.log("res--------", res);
        return res.data.data;
      } catch (err) {
        console.log("err", err);
        throw err;
      }
    }
  );

// Analytics slice
const masterDashboardSlice = createSlice({
  name: "master_dashboard",
  initialState: {
    masterDashboard: {
      isLoading: false,
      data: null as any | null,
      isError: false,
      errorMessage: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // getMasterDashboardData
    builder.addCase(getMasterDashboardData.pending, (state, action) => {
      state.masterDashboard.isLoading = true;
    });
    builder.addCase(getMasterDashboardData.fulfilled, (state, action) => {
        state.masterDashboard.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterDashboard.data = action.payload;
    });
    builder.addCase(getMasterDashboardData.rejected, (state, action) => {
        console.log("error in getMasterDashboardData", action.payload);
        state.masterDashboard.isLoading = false;
        state.masterDashboard.isError = true;
    });
  }
});

export const {  } = masterDashboardSlice.actions;
export const masterDashboardReducer = masterDashboardSlice.reducer;
