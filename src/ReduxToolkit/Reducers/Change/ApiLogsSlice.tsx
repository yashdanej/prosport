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

export const postMasterAdminPlanData = createAsyncThunk('postMasterAdminPlanData', async (data: any, { rejectWithValue }) => {
  try {
      console.log("postMasterAdminPlanData---------", data);
      const res = await api(`/master-admin/add-plan`, "post", data, false, true);
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


export const deleteMasterAdminPlanData = createAsyncThunk('deleteMasterAdminPlanData', async (id: any, { rejectWithValue }) => {
  try {
    console.log("deleteMasterAdminPlanData---------", id);
      const res = await api(`/master-admin/delete-plan/${id}`, "delete", false, false, true);
      console.log("res---", res);
      if (!res?.data?.success) {
        return rejectWithValue(res?.response?.data?.message);
      }
      return {id: id, data: res?.data};
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.message);
    }
});

export const editMasterAdminPlanData = createAsyncThunk('editMasterAdminPlanData', async (id: any, { rejectWithValue }) => {
  try {
      console.log("editMasterAdminPlanData---------", id);
      const res = await api(`/master-admin/get-plan-by-id/${id}`, "get", false, false, true);
      console.log("res---", res);
      if (!res?.data?.success) {
          return rejectWithValue(res?.response?.data?.message);
      }
      return {id: id, data: res?.data};
  } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.message);
  }
});

export const patchMasterAdminPlanData = createAsyncThunk('patchMasterAdminPlanData', async (data: {data: any, id: number}, { rejectWithValue }) => {
  try {
      console.log("patchMasterAdminPlanData---------", data);
      const res = await api(`/master-admin/update-plan/${data.id}`, "patch", data.data, false, true);
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

export const getMasterAdminUsersTableData = createAsyncThunk('getMasterAdminUsersTableData', async (_, { rejectWithValue }) => {
  try {
      // console.log("getMasterAdminUsersTableData---------", data);
      const res = await api(`/master-admin/user/details/users/`, "get", false, false, true);
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

export const getMasterAdminUsersData = createAsyncThunk('getMasterAdminUsersData', async (id: number, { rejectWithValue }) => {
  try {
      // console.log("getMasterAdminUsersData---------", data);
      const res = await api(`/master-admin/user/${id}`, "get", false, false, true);
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

export const getMasterAdminRecentDeviceData = createAsyncThunk('getMasterAdminRecentDeviceData', async (id: number, { rejectWithValue }) => {
  try {
      // console.log("getMasterAdminRecentDeviceData---------", data);
      const res = await api(`/master-admin/user/details/security/${id}`, "get", false, false, true);
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

export const getMasterAdminBillingDetailsData = createAsyncThunk('getMasterAdminBillingDetailsData', async (id: number, { rejectWithValue }) => {
  try {
      // console.log("getMasterAdminBillingDetailsData---------", data);
      const res = await api(`/master-admin/user/details/billing-statements/${id}`, "get", false, false, true);
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

export const getMasterAdminApiKeyData = createAsyncThunk('getMasterAdminApiKeyData', async (id: number, { rejectWithValue }) => {
  try {
      // console.log("getMasterAdminApiKeyData---------", data);
      const res = await api(`/master-admin/user/details/api_keys/${id}`, "get", false, false, true);
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

export const getMasterAdminRefferalsData = createAsyncThunk('getMasterAdminRefferalsData', async (id: number, { rejectWithValue }) => {
  try {
      // console.log("getMasterAdminRefferalsData---------", data);
      const res = await api(`/master-admin/user/details/referrals/${id}`, "get", false, false, true);
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

export const ChangeMasterAdminUsersPlan = createAsyncThunk('ChangeMasterAdminUsersPlan', async (id: number, { rejectWithValue }) => {
  try {
      // console.log("ChangeMasterAdminUsersPlan---------", data);
      const res = await api(`/master-admin/user/change-plan-status/${id}`, "patch", false, false, true);
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

export const ChangeUsersStatus = createAsyncThunk('ChangeUsersStatus', async (id: number, { rejectWithValue }) => {
  try {
      // console.log("ChangeUsersStatus---------", data);
      const res = await api(`/master-admin/user/change-plan-status/${id}`, "patch", false, false, true);
      console.log("res---", res);
      if (!res?.data?.success) {
          return rejectWithValue(res?.response?.data?.message);
      }
      return {data: res.data, id};
  } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.message);
  }
});

export const changeMasterAdminPlanData = createAsyncThunk('changeMasterAdminPlanData', async (data: {user_id: any, plan_id: number}, { dispatch, rejectWithValue }) => {
  try {
      console.log("patchMasterAdminPlanData---------", data);
      const res = await api(`/master-admin/user/${data.user_id}/upgrade-plan/${data.plan_id}`, "patch", false, false, true);
      console.log("res---", res);
      if (!res?.data?.success) {
          return rejectWithValue(res?.response?.data?.message);
      }
      dispatch(getMasterAdminBillingDetailsData(data.user_id));
      return res?.data;
  } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.message);
  }
});
  
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
          data: [] as any | null,
          plan: {
            isLoading: false,
            data: null as any | null,
            isError: false,
            errorMessage: "",
          },
          isError: false,
          errorMessage: "",
        },
        accountUsers: {
          isLoading: false,
          data: null as any | null,
          view: {
            isLoading: false,
            data: null as any | null,
            isError: false,
            errorMessage: "",
          },
          recentDevice: {
            isLoading: false,
            data: null as any | null,
            isError: false,
            errorMessage: "",
          },
          billing_statement: {
            isLoading: false,
            data: null as any | null,
            isError: false,
            errorMessage: "",
          },
          api_key: {
            isLoading: false,
            data: null as any | null,
            isError: false,
            errorMessage: "", 
          },
          refferals: {
            isLoading: false,
            data: null as any | null,
            isError: false,
            errorMessage: "", 
          },
          isError: false,
          errorMessage: "",
        },
    }
  },
  reducers: {
    // Add any reducers if needed
    emptyPlanGetById: (state) => {
      state.masterAdmin.plans.plan.data = null;
    }
  },
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

    // postMasterAdminPlanData
    builder.addCase(postMasterAdminPlanData.pending, (state) => {
      state.masterAdmin.plans.isLoading = true;
      console.log("state.profile.isLoading", state);
    });
    builder.addCase(postMasterAdminPlanData.fulfilled, (state, action) => {
        state.masterAdmin.plans.isLoading = false;
        console.log("postMasterAdminPlanData action.payload", action.payload);
        state.masterAdmin.plans.data.push(action.payload.data[0]);
    });
    builder.addCase(postMasterAdminPlanData.rejected, (state, action) => {
        state.masterAdmin.plans.isLoading = false;
        console.log("postMasterAdminPlanData.rejected", action);
        state.masterAdmin.plans.isError = true;
        state.masterAdmin.plans.errorMessage = action.payload as string;
    });

    // deleteMasterAdminPlanData
    builder.addCase(deleteMasterAdminPlanData.pending, (state) => {
      state.masterAdmin.plans.isLoading = true;
    });
    builder.addCase(deleteMasterAdminPlanData.fulfilled, (state, action) => {
        state.masterAdmin.plans.isLoading = false;
        console.log("deleteMasterAdminPlanData action.payload", action.payload);
        state.masterAdmin.plans.data = state.masterAdmin.plans.data.filter((plan: any) => plan.id !== action.payload.id);
    });
    builder.addCase(deleteMasterAdminPlanData.rejected, (state, action) => {
        state.masterAdmin.plans.isLoading = false;
        console.log("deleteMasterAdminPlanData.rejected", action);
        state.masterAdmin.plans.isError = true;
        state.masterAdmin.plans.errorMessage = action.payload as string;
    });

    // editMasterAdminPlanData
    builder.addCase(editMasterAdminPlanData.pending, (state) => {
      state.masterAdmin.plans.plan.isLoading = true;
    });
    builder.addCase(editMasterAdminPlanData.fulfilled, (state, action) => {
        state.masterAdmin.plans.plan.isLoading = false;
        console.log("editMasterAdminPlanData action.payload", action.payload);
        state.masterAdmin.plans.plan.data = action.payload.data.data;
    });
    builder.addCase(editMasterAdminPlanData.rejected, (state, action) => {
        state.masterAdmin.plans.plan.isLoading = false;
        console.log("editMasterAdminPlanData.rejected", action);
        state.masterAdmin.plans.plan.isError = true;
        state.masterAdmin.plans.plan.errorMessage = action.payload as string;
    });

    // patchMasterAdminPlanData
    builder.addCase(patchMasterAdminPlanData.pending, (state) => {
      state.masterAdmin.plans.isLoading = true;
    });
    builder.addCase(patchMasterAdminPlanData.fulfilled, (state, action) => {
        state.masterAdmin.plans.isLoading = false;
        console.log("patchMasterAdminPlanData action.payload", action.payload);
        state.masterAdmin.plans.data = state.masterAdmin.plans.data.filter((plan: any) => plan.id !== action.payload.id);
    });
    builder.addCase(patchMasterAdminPlanData.rejected, (state, action) => {
        state.masterAdmin.plans.isLoading = false;
        console.log("patchMasterAdminPlanData.rejected", action);
        state.masterAdmin.plans.isError = true;
        state.masterAdmin.plans.errorMessage = action.payload as string;
    });

    // getMasterAdminUsersTableData
    builder.addCase(getMasterAdminUsersTableData.pending, (state, action) => {
      state.masterAdmin.accountUsers.isLoading = true;
    });
    builder.addCase(getMasterAdminUsersTableData.fulfilled, (state, action) => {
        state.masterAdmin.accountUsers.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.accountUsers.data = action.payload.data;
    });
    builder.addCase(getMasterAdminUsersTableData.rejected, (state, action) => {
        console.log("error in getMasterAdminUsersTableData", action.payload);
        state.masterAdmin.accountUsers.isLoading = false;
        state.masterAdmin.accountUsers.isError = true;
    });
    
    // getMasterAdminUsersData
    builder.addCase(getMasterAdminUsersData.pending, (state, action) => {
      state.masterAdmin.accountUsers.view.isLoading = true;
    });
    builder.addCase(getMasterAdminUsersData.fulfilled, (state, action) => {
        state.masterAdmin.accountUsers.view.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.accountUsers.view.data = action.payload.data;
    });
    builder.addCase(getMasterAdminUsersData.rejected, (state, action) => {
        console.log("error in getMasterAdminUsersData", action.payload);
        state.masterAdmin.accountUsers.view.isLoading = false;
        state.masterAdmin.accountUsers.view.isError = true;
    });
    
    // getMasterAdminRecentDeviceData
    builder.addCase(getMasterAdminRecentDeviceData.pending, (state, action) => {
      state.masterAdmin.accountUsers.recentDevice.isLoading = true;
    });
    builder.addCase(getMasterAdminRecentDeviceData.fulfilled, (state, action) => {
        state.masterAdmin.accountUsers.recentDevice.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.accountUsers.recentDevice.data = action.payload.data;
    });
    builder.addCase(getMasterAdminRecentDeviceData.rejected, (state, action) => {
        console.log("error in getMasterAdminRecentDeviceData", action.payload);
        state.masterAdmin.accountUsers.recentDevice.isLoading = false;
        state.masterAdmin.accountUsers.recentDevice.isError = true;
    });

    // getMasterAdminBillingDetailsData
    builder.addCase(getMasterAdminBillingDetailsData.pending, (state, action) => {
      state.masterAdmin.accountUsers.billing_statement.isLoading = true;
    });
    builder.addCase(getMasterAdminBillingDetailsData.fulfilled, (state, action) => {
        state.masterAdmin.accountUsers.billing_statement.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.accountUsers.billing_statement.data = action.payload.data;
    });
    builder.addCase(getMasterAdminBillingDetailsData.rejected, (state, action) => {
        console.log("error in getMasterAdminBillingDetailsData", action.payload);
        state.masterAdmin.accountUsers.billing_statement.isLoading = false;
        state.masterAdmin.accountUsers.billing_statement.isError = true;
    });

    // getMasterAdminApiKeyData
    builder.addCase(getMasterAdminApiKeyData.pending, (state, action) => {
      state.masterAdmin.accountUsers.api_key.isLoading = true;
    });
    builder.addCase(getMasterAdminApiKeyData.fulfilled, (state, action) => {
        state.masterAdmin.accountUsers.api_key.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.accountUsers.api_key.data = action.payload.data;
    });
    builder.addCase(getMasterAdminApiKeyData.rejected, (state, action) => {
        console.log("error in getMasterAdminApiKeyData", action.payload);
        state.masterAdmin.accountUsers.api_key.isLoading = false;
        state.masterAdmin.accountUsers.api_key.isError = true;
    });

    // getMasterAdminRefferalsData
    builder.addCase(getMasterAdminRefferalsData.pending, (state, action) => {
      state.masterAdmin.accountUsers.refferals.isLoading = true;
    });
    builder.addCase(getMasterAdminRefferalsData.fulfilled, (state, action) => {
        state.masterAdmin.accountUsers.refferals.isLoading = false;
        console.log("action...pa", action.payload);
        state.masterAdmin.accountUsers.refferals.data = action.payload.data;
    });
    builder.addCase(getMasterAdminRefferalsData.rejected, (state, action) => {
        console.log("error in getMasterAdminRefferalsData", action.payload);
        state.masterAdmin.accountUsers.refferals.isLoading = false;
        state.masterAdmin.accountUsers.refferals.isError = true;
    });

    // ChangeMasterAdminUsersPlan
    builder.addCase(ChangeMasterAdminUsersPlan.pending, (state, action) => {
      state.masterAdmin.accountUsers.billing_statement.isLoading = true;
    });
    builder.addCase(ChangeMasterAdminUsersPlan.fulfilled, (state, action) => {
        state.masterAdmin.accountUsers.billing_statement.isLoading = false;
        console.log("ChangeMasterAdminUsersPlan action...pa", action.payload);
        state.masterAdmin.accountUsers.billing_statement.data[0].current_plan[0].status = action.payload.data;
    });
    builder.addCase(ChangeMasterAdminUsersPlan.rejected, (state, action) => {
        console.log("error in ChangeMasterAdminUsersPlan", action.payload);
        state.masterAdmin.accountUsers.billing_statement.isLoading = false;
        state.masterAdmin.accountUsers.billing_statement.isError = true;
    });

    // ChangeUsersStatus
    builder.addCase(ChangeUsersStatus.pending, (state, action) => {
      state.masterAdmin.allUsers.isLoading = true;
    });
    builder.addCase(ChangeUsersStatus.fulfilled, (state, action) => {
        state.masterAdmin.allUsers.isLoading = false;
        console.log("ChangeUsersStatus action...pa", action.payload);
        // Destructure id and data from payload
        const { id, data } = action.payload;
        
        // Find the user record by id in the data array
        const user = state.masterAdmin.allUsers.data.records.find((record: any) => record.userId === id);
        
        // If the user is found, update its status
        if (user) {
          user.status = data.data; // Assuming `data.data` holds the status value from the response
        }
    });
    builder.addCase(ChangeUsersStatus.rejected, (state, action) => {
        console.log("error in ChangeUsersStatus", action.payload);
        state.masterAdmin.allUsers.isLoading = false;
        state.masterAdmin.allUsers.isError = true;
    });

    //changeMasterAdminPlanData
    builder.addCase(changeMasterAdminPlanData.pending, (state, action) => {
      state.masterAdmin.accountUsers.billing_statement.isLoading = true;
    });
    builder.addCase(changeMasterAdminPlanData.fulfilled, (state, action) => {
        state.masterAdmin.accountUsers.billing_statement.isLoading = false;
        console.log("changeMasterAdminPlanData action...pa", action.payload);
    });
    builder.addCase(changeMasterAdminPlanData.rejected, (state, action) => {
        console.log("error in changeMasterAdminPlanData", action.payload);
        state.masterAdmin.accountUsers.billing_statement.isLoading = false;
        state.masterAdmin.accountUsers.billing_statement.isError = true;
    });
  },
});

export const { emptyPlanGetById } = ApiLogsSlice.actions;
export const ApiLogsReducer = ApiLogsSlice.reducer;
