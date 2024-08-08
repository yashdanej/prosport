import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

export const getCricketData = createAsyncThunk('getCricketData', async ({ status, page, limit }: { status: any, page: number, limit: number }) => {
    try {
      const res = await api(`/sport/cricket?status=${status}&page=${page}&limit=${limit}`, "get", false, false, true);
      console.log("res--------", res);
      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
});

// Sport slice
const SportSlice = createSlice({
  name: "sport",
  initialState: {
    cricket: {
        isLoading: false,
        data: null as any | null,
        isError: false,
        errorMessage: "",
        pagination: null
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // getCricketData
    builder.addCase(getCricketData.pending, (state, action) => {
      state.cricket.isLoading = true;
    });
    builder.addCase(getCricketData.fulfilled, (state, action) => {
        state.cricket.isLoading = false;
        console.log("action...pa", action.payload);
        state.cricket.data = action.payload?.data;
        state.cricket.pagination = action.payload?.pagination;
    });
    builder.addCase(getCricketData.rejected, (state, action) => {
        console.log("error in getCricketData", action.payload);
        state.cricket.isLoading = false;
        state.cricket.isError = true;
    });
  }
});

export const {  } = SportSlice.actions;
export const sportReducer = SportSlice.reducer;
