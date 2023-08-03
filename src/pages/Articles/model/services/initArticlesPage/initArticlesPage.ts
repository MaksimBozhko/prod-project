import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlesHasMore, getArticlesInited,
  getArticlesIsLoading,
  getArticlesPage,
} from 'pages/Articles/model/selectors/articlesPageSelectors';
import { articlesPageActions } from 'pages/Articles/model/slices/ArticlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (arg, thunkAPI) => {
    const { getState, dispatch } = thunkAPI

    const inited = getArticlesInited(getState())

    if (!inited) {
      dispatch(articlesPageActions.initState())
      dispatch(fetchArticlesList({ page: 1 }))
    }
  },
)
