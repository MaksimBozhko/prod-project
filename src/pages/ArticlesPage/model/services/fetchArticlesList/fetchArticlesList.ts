import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleType } from 'entities/Article';
import {
  getArticlesFiltersLimit,
  getArticlesFiltersOrder,
  getArticlesFiltersSearch,
  getArticlesFiltersSort,
  getArticlesFiltersType,
} from 'features/articlesFilters';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { getArticlesPage } from '../../selectors/articlesPageSelectors';

export interface FetchArticlesListProps {
  replace?: boolean
}

export interface RequestFetchArticlesListData {
  data: Article[],
  limit: number
}

export const fetchArticlesList = createAsyncThunk<
  RequestFetchArticlesListData,
  FetchArticlesListProps,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticleRecommendations',
  async (_, thunkAPI) => {
    const {
      rejectWithValue,
      extra,
      getState,
    } = thunkAPI

    const limit = getArticlesFiltersLimit(getState())
    const page = getArticlesPage(getState())
    const search = getArticlesFiltersSearch(getState())
    const order = getArticlesFiltersOrder(getState())
    const sort = getArticlesFiltersSort(getState())
    const type = getArticlesFiltersType(getState())

    try {
      addQueryParams({ search, order, sort })
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _order: order,
          _sort: sort,
          q: search,
          type: type === ArticleType.ALL ? undefined : type,
        },
      })

      if (!response.data) {
        throw new Error()
      }

      return { data: response.data, limit }
    } catch (e) {
      return rejectWithValue('error')
    }
  },
)
