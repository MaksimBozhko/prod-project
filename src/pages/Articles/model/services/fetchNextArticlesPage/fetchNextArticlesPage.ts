import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlesHasMore,
  getArticlesIsLoading,
  getArticlesPage,
} from 'pages/Articles/model/selectors/articlesPageSelectors';
import { articlesPageActions } from 'pages/Articles/model/slices/ArticlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlesPage',
  async (arg, thunkAPI) => {
    const { getState, dispatch } = thunkAPI

    const hasMore = getArticlesHasMore(getState())
    const page = getArticlesPage(getState())
    const isLoading = getArticlesIsLoading(getState())

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1))
      dispatch(fetchArticlesList({
        page: page + 1,
      }))
    }
  },
)
