import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarSchema } from '@/widgets/Sidebar/model/types/SidebarSchema';

const initialState: SidebarSchema= {
  collapsed: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const { actions: sidebarActions } = sidebarSlice;
export const { reducer: sidebarReducer } = sidebarSlice;
