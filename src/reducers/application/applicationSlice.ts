import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Application } from 'models/application.model';
import {
  fetchAllReq,
} from './applicationAPI';

export interface UserState {
  applications: Application[];
  status: 'idle' | 'loading' | 'failed' | 'fetched';
}

const initialState: UserState = {
  applications: [],
  status: 'loading'
};

export const getAllProducts = createAsyncThunk(
  'application/getAllReq',
  async () => {
    const response = await fetchAllReq();
    return response.data.products;
  }
);

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = 'fetched';
        state.applications = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.status = 'failed';
      })
  }
});

export const selectApplications = (state: RootState) => state.application;

export default applicationSlice.reducer;
