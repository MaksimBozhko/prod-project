import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
)

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    error: undefined,
    isLoading: false,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
  }),
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.fulfilled, (
        state,
        { payload, meta },
      ) => {
        state.isLoading = false
        state.hasMore = payload.data.length >= payload.limit
        if (meta.arg.replace) {
          articlesAdapter.setAll(state, payload.data)
        } else {
          articlesAdapter.addMany(state, payload.data)
        }
      })
      .addCase(fetchArticlesList.pending, (state, { meta }) => {
        state.isLoading = true
        state.error = undefined
        if (meta.arg.replace) {
          articlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticlesList.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
  },
})

export const {
  reducer: articlesPageReducer,
  actions: articlesPageActions,
} = articlesPageSlice
