import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

// Thunk for createToken
export const createToken = createAsyncThunk(
  "subscribe/token",
  async (data: { id: number, name: string; email: string}, { rejectWithValue }) => {
    try {
      console.log("createToken---------", data);
      const res = await api(`/order/create-token/${data.id}`, "post", data, false, true);
      console.log("res---", res);
      if (res?.response?.status === 400) {
        return rejectWithValue(res?.response?.data?.message);
      }
      return res?.data;
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.message);
    }
  }
);

export const getApiKeys = createAsyncThunk('getApiKeys', async (id) => {
    try {
        const res = await api(`/order/api_key`, "get", false, false, true);
        console.log("res--------", res);
        return res.data.data;
    } catch (err) {
        console.log("err", err);
        throw err;
    }
});

export const getCommission = createAsyncThunk('getCommission', async (id) => {
  try {
      const res = await api(`/order/commission`, "get", false, false, true);
      console.log("res--------", res);
      return res.data;
  } catch (err) {
      console.log("err", err);
      throw err;
  }
});

export const getBilling = createAsyncThunk('getBilling', async (id) => {
    try {
        const res = await api(`/order/billing`, "get", false, false, true);
        console.log("res--------", res);
        return res.data.data;
    } catch (err) {
        console.log("err", err);
        throw err;
    }
});

export const getSubscribe = createAsyncThunk('getSubscribe', async (id) => {
  try {
      const res = await api(`/order/subscription`, "get", false, false, true);
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
const subscribeSlice = createSlice({
  name: "token",
  initialState: {
    token: {
      isLoading: false,
      data: null as any | null,
      isError: false,
      errorMessage: "",
    },
    api_keys: {
        isLoading: false,
        data: null as any | null,
        isError: false,
        errorMessage: "",
    },
    billing: {
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
    },
    commission: {
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
    // Handle createToken
    builder.addCase(createToken.pending, (state) => {
      state.token.isLoading = true;
      state.token.isError = false;
      state.token.errorMessage = "";
    });
    builder.addCase(createToken.fulfilled, (state, action) => {
      console.log("createToken fulfilled", action.payload);
      state.token.data = action.payload;
      state.token.isLoading = false;
    });
    builder.addCase(createToken.rejected, (state, action) => {
      console.log("createToken rejected", action.payload);
      state.token.isLoading = false;
      state.token.isError = true;
      state.token.errorMessage = action.payload as string;
    });

    // getApiKeys
    builder.addCase(getApiKeys.pending, (state, action) => {
        state.api_keys.isLoading = true;
    });
    builder.addCase(getApiKeys.fulfilled, (state, action) => {
        state.api_keys.isLoading = false;
        console.log("action...pa", action.payload);
        state.api_keys.data = action.payload;
    });
    builder.addCase(getApiKeys.rejected, (state, action) => {
        console.log("error in getApiKeys", action.payload);
        state.api_keys.isLoading = false;
        state.api_keys.isError = true;
    });

    // getBilling
    builder.addCase(getBilling.pending, (state, action) => {
        state.billing.isLoading = true;
    });
    builder.addCase(getBilling.fulfilled, (state, action) => {
        state.billing.isLoading = false;
        console.log("action...pa", action.payload);
        state.billing.data = action.payload;
    });
    builder.addCase(getBilling.rejected, (state, action) => {
        console.log("error in getBilling", action.payload);
        state.billing.isLoading = false;
        state.billing.isError = true;
    });

    // getSubscribe
    builder.addCase(getSubscribe.pending, (state, action) => {
      state.plans.isLoading = true;
    });
    builder.addCase(getSubscribe.fulfilled, (state, action) => {
        state.plans.isLoading = false;
        console.log("action...pa", action.payload);
        state.plans.data = action.payload;
    });
    builder.addCase(getSubscribe.rejected, (state, action) => {
        console.log("error in getSubscribe", action.payload);
        state.plans.isLoading = false;
        state.plans.isError = true;
    });

    // getCommission
    builder.addCase(getCommission.pending, (state, action) => {
      state.commission.isLoading = true;
    });
    builder.addCase(getCommission.fulfilled, (state, action) => {
        state.commission.isLoading = false;
        console.log("action...pa", action.payload);
        state.commission.data = action.payload;
    });
    builder.addCase(getCommission.rejected, (state, action) => {
        console.log("error in getCommission", action.payload);
        state.commission.isLoading = false;
        state.commission.isError = true;
    });
  }
});

export const subscribeReducer = subscribeSlice.reducer;
