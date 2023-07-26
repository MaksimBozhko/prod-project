import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, { payload }: PayloadAction<boolean>) => {
      state.readonly = payload
    },
    cancelEdit: (state) => {
      state.readonly = true
      state.validateErrors = undefined;
      state.form = state.data
    },
    updateProfile: (state, { payload }: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.fulfilled, (state, { payload }: PayloadAction<Profile>) => {
        state.isLoading = false
        state.data = payload
        state.form = payload
      })
      .addCase(fetchProfileData.pending, (state) => {
        state.validateErrors = undefined
        state.isLoading = true
      })
      .addCase(fetchProfileData.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(updateProfileData.fulfilled, (state, { payload }: PayloadAction<Profile>) => {
        state.isLoading = false
        state.data = payload
        state.form = payload
        state.readonly = true
        state.validateErrors = undefined
      })
      .addCase(updateProfileData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(updateProfileData.rejected, (state, { payload }) => {
        state.isLoading = false
        state.validateErrors = payload
      })
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice

//       .addCase(updateProfileData.pending, (state) => {
//         state.validateErrors = undefined;
//         state.isLoading = true;
//       })
//       .addCase(updateProfileData.fulfilled, (
//         state,
//         action: PayloadAction<Profile>,
//       ) => {
//         state.isLoading = false;
//         state.data = action.payload;
//         state.form = action.payload;
//         state.readonly = true;
//         state.validateErrors = undefined;
//       })
//       .addCase(updateProfileData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.validateErrors = action.payload;
//       });
//   },
// });
//
// // Action creators are generated for each case reducer function
// export const { actions: profileActions } = profileSlice;
// export const { reducer: profileReducer } = profileSlice;
