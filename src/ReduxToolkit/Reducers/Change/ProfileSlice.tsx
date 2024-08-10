import { createSlice, createAsyncThunk, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { api } from "../../../Utils";
import { RootState } from "../../Store";

// Define the profile state type
interface ProfileState {
  isLoading: boolean;
  data: any | null;
  isError: boolean;
  errorMessage: string;
  image: string;
  message: any;
}

// Initial state
const initialState: { profile: ProfileState } = {
  profile: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "",
    image: "",
    message: ""
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
        const res = await api(`/profile/update_profile`, "patch", data, false, true);
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

export const updateProfileImage = createAsyncThunk('updateProfileImage', async (data: any, { rejectWithValue }) => {
    try {
        console.log("updateProfileImage---------", data);
        const res = await api(`/profile/update_profile/image`, "patch", data, true, true);
        console.log("res---", res);
        if (!res?.data?.success) {
            return rejectWithValue(res?.data?.message);
        }
        return res?.data;
    } catch (err: any) {
        console.log("err", err);
        return rejectWithValue(err.message);
    }
});

export const changePassoword = createAsyncThunk('changePassoword', async (data: any, { rejectWithValue }) => {
    try {
        console.log("updateProfile---------", data);
        const res = await api(`/profile/change-password`, "patch", data, false, true);
        console.log("res---", res);
        if (!res?.data?.success) {
            return rejectWithValue(res?.response?.data?.message);
        }
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

    builder.addCase(updateProfileImage.pending, (state) => {
        state.profile.isLoading = true;
        console.log("state.profile.isLoading", state);
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
        state.profile.isLoading = false;
        console.log("wwdwdwdAction", action.payload);
        state.profile.image = action.payload.data;
    });
    builder.addCase(updateProfileImage.rejected, (state, action) => {
        state.profile.isLoading = false;
        console.log("updateProfileImage.rejected", action);
        state.profile.isError = true;
        state.profile.errorMessage = action.payload as string;
    });

    builder.addCase(changePassoword.pending, (state) => {
        state.profile.isLoading = true;
        console.log("state.profile.isLoading", state);
    });
    builder.addCase(changePassoword.fulfilled, (state, action) => {
        console.log("action", action);
        state.profile.isLoading = false;
        state.profile.message = action.payload.data;
        console.log("wwdwdwdAction", action.payload);
    });
    builder.addCase(changePassoword.rejected, (state, action) => {
        state.profile.isLoading = false;
        console.log("changePassoword.rejected", action);
        state.profile.message = action.payload;
        state.profile.isError = true;
        state.profile.errorMessage = action.payload as string;
    });
  }
});

export const { emptyProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;