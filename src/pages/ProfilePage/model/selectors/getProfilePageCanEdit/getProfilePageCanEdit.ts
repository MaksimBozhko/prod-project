import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { getProfileData } from 'entities/Profile';

export const getIsProfilePageCanEdit = createSelector(
  getUserAuthData,
  getProfileData,
  (userData, profileData) => userData?.id === profileData?.id,
)
