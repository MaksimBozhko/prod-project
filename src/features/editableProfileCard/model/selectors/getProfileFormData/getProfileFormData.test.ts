import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileFormData } from './getProfileFormData';

describe('getProfileFormData.test', () => {
  test('should return form data', () => {
    const form = {
      username: 'admin',
      age: 22,
      country: Country.Ukraine,
      lastname: 'ulbi tv',
      firstname: 'asd',
      city: 'asf',
      currency: Currency.USD,
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        form,
      },
    }
    expect(getProfileFormData(state as StateSchema)).toEqual(form)
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileFormData(state as StateSchema)).toEqual(undefined)
  })
})
