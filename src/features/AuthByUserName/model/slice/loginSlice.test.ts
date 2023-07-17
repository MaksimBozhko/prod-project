import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from 'features/AuthByUserName';
import { loginActions, loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: 'name' }
    expect(loginReducer(
      state as LoginSchema,
      loginActions.setUsername('nameNew'),
    )).toEqual({ username: 'nameNew' })
  })

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' }
    expect(loginReducer(
      state as LoginSchema,
      loginActions.setPassword('123123'),
    )).toEqual({ password: '123123' })
  })
})
