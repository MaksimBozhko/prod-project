import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
    preloadedState: initialState,
    devTools: __IS_DEV__,
  })
}
