import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileError } from 'features/editableProfileCard/model/consts/consts';
import { validateProfileData } from './validateProfileData';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'ulbi tv',
  firstname: 'asd',
  city: 'asf',
  currency: Currency.USD,
}

describe('validateProfileData', () => {
  test('success', () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without firstname and lastname', () => {
    const result = validateProfileData({ ...data, firstname: '', lastname: '' });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('incorrect age', () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test('incorrect country', () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test('incorrect all', () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
