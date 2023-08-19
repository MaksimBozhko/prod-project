import { StateSchema } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '@/features/editableProfileCard/model/consts/consts';
import { getProfileValidateError } from './getProfileValidateError';

describe('getProfileValidateError.test', () => {
  test('should return validate error', () => {
    const validateError = [
      ValidateProfileError.SERVER_ERROR,
      ValidateProfileError.INCORRECT_USER_DATA,
    ]
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: validateError,
      },
    }
    expect(getProfileValidateError(state as StateSchema)).toEqual(validateError)
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidateError(state as StateSchema)).toEqual(undefined)
  })
})
