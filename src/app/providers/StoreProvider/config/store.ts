import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUserName';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
  }
  return configureStore<StateSchema>({
    reducer: rootReducers,
    preloadedState: initialState,
    devTools: __IS_DEV__,
  })
}
