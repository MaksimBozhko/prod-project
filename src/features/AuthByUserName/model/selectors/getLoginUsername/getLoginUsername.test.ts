import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from 'features/AuthByUserName/model/selectors/getLoginUsername/getLoginUsername';

describe('getLoginUsername.test', () => {
  test('should return correct username', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'name',
      },
    }
    expect(getLoginUsername(state as StateSchema)).toEqual('name')
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginUsername(state as StateSchema)).toEqual('')
  })
})
