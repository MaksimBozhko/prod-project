import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileFormData } from 'entities/Profile';
import { validateProfileData } from 'entities/Profile/model/services/validateProfileData/validateProfileData';
import { Profile, ValidateProfileError } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, string, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',
  async (profileId, thunkAPI) => {
    const {
      rejectWithValue,
      extra,
      getState,
    } = thunkAPI

    const formData = getProfileFormData(getState())

    const errors = validateProfileData(formData)

    if (errors?.length) {
      return rejectWithValue(errors)
    }

    try {
      const response = await extra.api.put<Profile>(`/profile/${profileId}`, formData)

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      return rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  },
)
