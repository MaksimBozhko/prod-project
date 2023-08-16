import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from 'features/editableProfileCard';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileReducer } from 'features/editableProfileCard/model/slice/profileSlice';
import userEvent from '@testing-library/user-event';
import { $api } from 'shared/api/api';

const profile: Profile = {
  id: '1',
  lastname: 'admin',
  firstname: 'admin',
  age: 10,
  country: Country.Belarus,
  currency: Currency.EUR,
}

const options = {
  initialState: {
    profile: {
      data: profile,
      form: profile,
      readonly: true,
    },
    user: {
      authData: { id: '1', username: 'admin' },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
}

describe('features/EditableProfileCard', () => {
  test('readonly should change', async () => {
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
  });

  test('при отмене значения должны обнуляться', async () => {
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
  });

  // test('Должна появиться ошибка', async () => {
  //   componentRender(<EditableProfileCard id="1" />, options);
  //   await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
  //
  //   await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
  //
  //   await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
  //
  //   expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  // });

  test('если нет ошибок, должен уйти put запрос', async () => {
    componentRender(<EditableProfileCard id="1" />, options)

    const mockPut = jest.spyOn($api, 'put')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(mockPut).toHaveBeenCalled()
  });
});
