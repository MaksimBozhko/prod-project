import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
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
    view: ArticleView.SMALL,
  }),
  reducers: {
    setView: (state, { payload }: PayloadAction<ArticleView>) => {
      state.view = payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, payload)
    },
    initState: (state) => {
      state.view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.fulfilled, (state, { payload }: PayloadAction<Article[]>) => {
        state.isLoading = false
        articlesAdapter.setAll(state, payload)
      })
      .addCase(fetchArticlesList.pending, (state) => {
        state.isLoading = true
        state.error = undefined
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
