import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  Application,
  ApplicationCreatePayload
} from 'models/application.model';
import {
  fetchAllReq,
  createApplicationReq,
  updateApplicationReq
} from './applicationAPI';

export interface UserState {
  applications: Application[];
  activeApplication: null | Application;
  status: 'idle' | 'loading' | 'failed' | 'fetched';
}

const initialState: UserState = {
  applications: [],
  activeApplication: null,
  status: 'idle'
};

export const getAllApplications = createAsyncThunk(
  'application/getAllReq',
  async () => {
    const response = await fetchAllReq();
    return response.data.products;
  }
);

export const createApplication = createAsyncThunk(
  'application/createReq',
  async (formData: ApplicationCreatePayload) => {
    const response = await createApplicationReq(formData);
    return response.data;
  }
);

export const updateApplication = createAsyncThunk(
  'application/updateReq',
  async (formData: Application) => {
    const response = await updateApplicationReq(formData);
    return response.data;
  }
);

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setActiveApplication: (
      state,
      action: PayloadAction<Application | null>
    ) => {
      state.activeApplication = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllApplications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllApplications.fulfilled, (state, action) => {
        state.status = 'fetched';
        state.applications = action.payload;
      })
      .addCase(getAllApplications.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createApplication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.status = 'fetched';
        state.applications.push(action.payload);
      })
      .addCase(createApplication.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateApplication.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.status = 'fetched';
        const updatedApplicationIndex = state.applications.findIndex(
          (a) => a.id === Number(action.payload.id)
        );
        if (updatedApplicationIndex !== -1) {
          state.applications[updatedApplicationIndex] = action.payload;
        }
      })
      .addCase(updateApplication.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { setActiveApplication } = applicationSlice.actions;

export const selectApplications = (state: RootState) => state.application;

export default applicationSlice.reducer;
