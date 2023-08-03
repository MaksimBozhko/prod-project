import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList')

const data = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'ulbi tv',
  firstname: 'asd',
  city: 'asf',
  currency: Currency.USD,
}

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        hasMore: true,
        isLoading: false,
        limit: 5,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 })
  })
  test('fetchArticlesList not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        hasMore: false,
        isLoading: false,
        limit: 5,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalledWith()
  })
  test('fetchArticlesList not called isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        hasMore: true,
        isLoading: true,
        limit: 5,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalledWith()
  })
})
