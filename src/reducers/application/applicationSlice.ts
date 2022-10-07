import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AxiosError } from 'axios';
import { Application, ApplicationError } from 'models/application.model';
import {
  fetchAllReq,
  createApplicationReq,
  updateApplicationReq,
  deleteApplicationReq,
  getApplicationReq
} from './applicationAPI';

export interface ApplicationState {
  applications: Application[];
  activeApplication: null | Application;
  status: 'idle' | 'loading' | 'failed' | 'fetched' | 'deleting';
}

const initialState: ApplicationState = {
  applications: [],
  activeApplication: null,
  status: 'idle'
};

export const getAllApplications = createAsyncThunk(
  'application/getAllReq',
  async () => {
    const response = await fetchAllReq();
    return response.data;
  }
);

export const getApplication = createAsyncThunk(
  'application/getReq',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const response = await getApplicationReq(applicationId);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ApplicationError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createApplication = createAsyncThunk(
  'application/createReq',
  async (formData: Application, { rejectWithValue }) => {
    try {
      await createApplicationReq(formData);
      return formData;
    } catch (err) {
      const error = err as AxiosError<ApplicationError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateApplication = createAsyncThunk(
  'application/updateReq',
  async (formData: Application, { rejectWithValue }) => {
    try {
      await updateApplicationReq(formData);
      return formData;
    } catch (err) {
      const error = err as AxiosError<ApplicationError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteApplication = createAsyncThunk(
  'application/deleteReq',
  async (applicationId: string) => {
    await deleteApplicationReq(applicationId);
    return applicationId;
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
      .addCase(getApplication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getApplication.fulfilled, (state, action) => {
        state.status = 'idle';
        state.activeApplication = action.payload;
      })
      .addCase(getApplication.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.status = 'fetched';
        state.applications.push(action.payload);
      })
      .addCase(createApplication.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.status = 'fetched';
        const updatedApplicationIndex = state.applications.findIndex(
          (a) => a.id === action.payload.id
        );
        if (updatedApplicationIndex !== -1) {
          state.applications[updatedApplicationIndex] = action.payload;
        }
      })
      .addCase(updateApplication.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteApplication.pending, (state) => {
        state.status = 'deleting';
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.status = 'fetched';
        const updatedApplicationIndex = state.applications.findIndex(
          (a) => a.id.toString() === action.payload.toString()
        );
        if (updatedApplicationIndex !== -1) {
          state.applications.splice(updatedApplicationIndex, 1);
        }
      });
  }
});

export const { setActiveApplication } = applicationSlice.actions;

export const selectApplications = (state: RootState) => state.application;

export default applicationSlice.reducer;
