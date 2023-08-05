import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesFiltersActions, ArticleSortField, getArticlesFiltersInited } from 'features/articlesFilters';
import { SortOrder } from 'shared/types';
import { ArticleType } from 'entities/Article';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (searchParams, thunkAPI) => {
    const { getState, dispatch } = thunkAPI

    const inited = getArticlesFiltersInited(getState())

    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder
      const sortFromUrl = searchParams.get('sort') as ArticleSortField
      const searchFromUrl = searchParams.get('search')
      const typeFromUrl = searchParams.get('type') as ArticleType

      if (orderFromUrl) {
        dispatch(articlesFiltersActions.setOrder(orderFromUrl))
      }
      if (sortFromUrl) {
        dispatch(articlesFiltersActions.setSort(sortFromUrl))
      }
      if (searchFromUrl) {
        dispatch(articlesFiltersActions.setSearch(searchFromUrl))
      }
      if (typeFromUrl) {
        dispatch(articlesFiltersActions.setType(typeFromUrl))
      }

      dispatch(articlesFiltersActions.initState())
      dispatch(fetchArticlesList({}))
    }
  },
)
