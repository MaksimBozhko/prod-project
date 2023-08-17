import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from 'entities/User';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles

export const getUserIsManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.MANAGER)))
export const getUserIsAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.ADMIN)))
