import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileFormData } from 'entities/Profile';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    const {
      rejectWithValue,
      extra,
      getState,
    } = thunkAPI

    const formData = getProfileFormData(getState())

    try {
      const response = await extra.api.put<Profile>('/profile', formData)
      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  },
)
