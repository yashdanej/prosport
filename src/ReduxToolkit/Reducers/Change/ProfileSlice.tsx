import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

// Define the profile state type
interface ProfileState {
  isLoading: boolean;
  data: any | null;
  isError: boolean;
  errorMessage: string;
}

// Initial state
const initialState: { profile: ProfileState } = {
  profile: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "",
  }
};

// Thunk for getting the logged user's profile
export const getLoggedUserProfile = createAsyncThunk('getLoggedUserProfile', async (_, { rejectWithValue }) => {
    try {
        const res = await api(`/profile/get_logged_user`, "get", false, false, true);
        console.log("res--------", res);
        return res.data.data;
    } catch (err: any) {
        console.log("err", err);
        return rejectWithValue(err.message);
    }
});

// Thunk for updating the profile
export const updateProfile = createAsyncThunk('updateProfile', async (data: any, { rejectWithValue }) => {
    try {
        console.log("updateProfile---------", data);
        const res = await api(`/profile/update_profile`, "patch", data, true, true);
        console.log("res---", res);
        if (!res?.data?.success) {
            return rejectWithValue(res?.data?.message);
        }
        console.log("return wdwd");
        
        return res?.data;
    } catch (err: any) {
        console.log("err", err);
        return rejectWithValue(err.message);
    }
});

// Define the type of dispatch that includes Thunks
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

// Profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Add any reducers if needed
    emptyProfile(state){
        console.log('state', state);
        state.profile.isLoading = false
        state.profile.data = null
        state.profile.isError = false
        state.profile.errorMessage = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedUserProfile.pending, (state) => {
        state.profile.isLoading = true;
    });
    builder.addCase(getLoggedUserProfile.fulfilled, (state, action) => {
        state.profile.isLoading = false;
        state.profile.data = action.payload;
    });
    builder.addCase(getLoggedUserProfile.rejected, (state, action) => {
        state.profile.isLoading = false;
        state.profile.isError = true;
        state.profile.errorMessage = action.payload as string;
    });

    builder.addCase(updateProfile.pending, (state) => {
        state.profile.isLoading = true;
        console.log("state.profile.isLoading", state);
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
        state.profile.isLoading = false;
        console.log("wwdwdwdAction", action.payload);
        state.profile.data = action.payload.data;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
        state.profile.isLoading = false;
        console.log("updateProfile.rejected", action);
        state.profile.isError = true;
        state.profile.errorMessage = action.payload as string;
    });
  }
});

export const { emptyProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;