import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
)

const articleDetailsCommentsSlice = createSlice({
  name: 'ArticleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    error: undefined,
    isLoading: false,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.fulfilled, (state, { payload }: PayloadAction<Comment[]>) => {
        state.isLoading = false
        commentsAdapter.setAll(state, payload)
      })
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
  },
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice
