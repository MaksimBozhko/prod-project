import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
  fetchArticleRecommendations,
} from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
)

const ArticleDetailsPageRecommendationsSlice = createSlice({
  name: 'ArticleDetailsPageRecommendationsSlice',
  initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
    error: undefined,
    isLoading: false,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.fulfilled, (state, { payload }: PayloadAction<Article[]>) => {
        state.isLoading = false
        recommendationsAdapter.setAll(state, payload)
      })
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchArticleRecommendations.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
  },
})

export const { reducer: articleDetailsPageRecommendationsReducer } = ArticleDetailsPageRecommendationsSlice
