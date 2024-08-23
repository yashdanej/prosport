import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

export const getAnalyticsData = createAsyncThunk('getAnalyticsData', async (id, {rejectWithValue}) => {
  try {
      const res = await api(`/dashboard/api_key`, "get", false, false, true);
      console.log("res--------", res);
      return res.data.data;
  } catch (err) {
      console.log("err", err);
      rejectWithValue(err)
  }
});

// Analytics slice
const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    analytics: {
      isLoading: false,
      data: null as any | null,
      isError: false,
      errorMessage: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // getAnalyticsData
    builder.addCase(getAnalyticsData.pending, (state, action) => {
      state.analytics.isLoading = true;
    });
    builder.addCase(getAnalyticsData.fulfilled, (state, action) => {
        state.analytics.isLoading = false;
        console.log("action...pa", action.payload);
        state.analytics.data = action.payload;
    });
    builder.addCase(getAnalyticsData.rejected, (state, action) => {
        console.log("error in getAnalyticsData", action.payload);
        state.analytics.isLoading = false;
        state.analytics.isError = true;
    });
  }
});

export const {  } = analyticsSlice.actions;
export const analyticsReducer = analyticsSlice.reducer;
