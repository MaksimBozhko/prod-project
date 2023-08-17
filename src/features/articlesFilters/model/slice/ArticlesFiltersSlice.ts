import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SortOrder } from 'shared/types';
import { ArticleType, ArticleView } from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ArticleSortField } from '../consts/consts';
import { ArticlesFiltersSchema } from '../types/articlesFiltersSchema';

const initialState: ArticlesFiltersSchema = {
  search: '',
  sort: ArticleSortField.CREATED,
  order: 'asc',
  view: localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView || ArticleView.SMALL,
  type: ArticleType.ALL,
  _inited: false,
};

const articlesFiltersSlice = createSlice({
  name: 'articlesFiltersSlice',
  initialState,
  reducers: {
    initState: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
      // state.view = view
      state.limit = view === ArticleView.BIG ? 4 : 10
      state._inited = true
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload
    },
    setSort: (state, { payload }: PayloadAction<ArticleSortField>) => {
      state.sort = payload
    },
    setOrder: (state, { payload }: PayloadAction<SortOrder>) => {
      state.order = payload
    },
    setView: (state, { payload }: PayloadAction<ArticleView>) => {
      state.view = payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, payload)
    },
    setType: (state, { payload }: PayloadAction<ArticleType>) => {
      state.type = payload
    },
  },
})

export const {
  reducer: articlesFiltersReducer,
  actions: articlesFiltersActions,
} = articlesFiltersSlice
