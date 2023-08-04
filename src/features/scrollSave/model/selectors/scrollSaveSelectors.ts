import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getScroll = (state: StateSchema) => state.scroll

export const getScrollPositionByPath = createSelector(
  getScroll,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
)
