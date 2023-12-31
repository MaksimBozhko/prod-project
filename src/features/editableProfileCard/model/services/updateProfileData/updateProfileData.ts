import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '@/features/editableProfileCard/model/consts/consts';
import { getProfileFormData } from '../../selectors/getProfileFormData/getProfileFormData';
import { validateProfileData } from '../../services/validateProfileData/validateProfileData';

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
