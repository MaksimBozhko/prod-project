import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileFormData } from 'entities/Profile';
import { validateProfileData } from 'entities/Profile/model/services/validateProfileData/validateProfileData';
import { Profile, ValidateProfileError } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
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
      const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      return rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  },
)
