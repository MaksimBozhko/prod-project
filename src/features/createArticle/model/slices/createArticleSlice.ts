import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article';
import { CreateArticleSchema } from '@/features/createArticle';
import {
  ArticleBlock,
  ArticleBlockBase,
  ArticleImageBlock,
  ArticleTextBlock
} from '@/entities/Article/model/types/article';
import { getCurrentDate } from '@/shared/helpers/currentDate';
import { User } from '@/entities/User';
import { fetchArticleById } from '@/entities/Article/model/services/fetchArticleById/fetchArticleById';
import { fetchEditArticle } from '@/features/createArticle/model/services/editArticle/fetchEditArticle';
import { fetchCreateArticle } from '@/features/createArticle/model/services/createArticle/fetchCreateArticle';

const initialState: CreateArticleSchema = {
  article: {
    id: '',
    userId: '',
    title: '',
    subtitle: '',
    img: '',
    views: 0,
    createdAt: '',
    type: '' as ArticleType,
    blocks: [],
  },
  isLoading: false
};

export const createArticleSlice = createSlice({
  name: 'createArticle',
  initialState,
  reducers: {
    setTitle: (state, {payload}: PayloadAction<string>) => {
      state.article.title = payload
    },
    setSubTitle: (state, {payload}: PayloadAction<string>) => {
      state.article.subtitle = payload
    },
    setImg: (state, {payload}: PayloadAction<string>) => {
      state.article.img = payload
    },
    setType: (state, {payload}: PayloadAction<ArticleType>) => {
      state.article.type = payload
    },
    setNewBlock: (state, {payload}: PayloadAction<ArticleBlockType>) => {
      const id = state.article.blocks.length.toString()
      switch (payload) {
        case ArticleBlockType.CODE:
          state.article.blocks.push({id, type: payload, code: ''})
          break;
        case ArticleBlockType.TEXT:
          state.article.blocks.push({id, type: payload, title: '', paragraphs: ['']})
          break;
        case ArticleBlockType.IMAGE:
          state.article.blocks.push({id, type: payload, title: '', src: ''})
          break;
      }
    },
    updateBlockTitle: (state, {payload}: PayloadAction<{ id: number, title: string }>) => {
      const {id, title} = payload
      const block = state.article.blocks.find((block) => block.id === id.toString())
      if (block && block.type !== ArticleBlockType.CODE) {
        block.title = title
      }
    },
    updateBlockContent: (state, {payload}: PayloadAction<{ id: number, content: string }>) => {
      const {id, content} = payload
      const block = state.article.blocks.find((block) => block.id === id.toString())
      if (block && block.type == ArticleBlockType.TEXT) {
        block.paragraphs = [content]
      } else if (block && block.type == ArticleBlockType.CODE) {
        block.code = content
      } else if (block && block.type == ArticleBlockType.IMAGE) {
        block.src = content
      }
    },
    setRestInfo: (state, {payload}: PayloadAction<string>) => {
      state.article.id = '11'
      state.article.views = 0
      state.article.createdAt = getCurrentDate()
      state.article.userId = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.fulfilled, (state, {payload}: PayloadAction<Article>) => {
        state.isLoading = false
        state.article = payload
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticleById.rejected, (state, {payload}) => {
        state.isLoading = false
        state.error = payload
      })
      // .addCase(fetchCreateArticle.fulfilled, (state, {payload}: PayloadAction<Article>) => {
      //   state.isLoading = false
      // })
      // .addCase(fetchCreateArticle.pending, (state) => {
      //   state.error = undefined
      //   state.isLoading = true
      // })
      // .addCase(fetchCreateArticle.rejected, (state, {payload}) => {
      //   state.isLoading = false
      //   state.error = payload
      // })
      // .addCase(fetchEditArticle.fulfilled, (state, {payload}: PayloadAction<Article>) => {
      //   state.isLoading = false
      // })
      // .addCase(fetchEditArticle.pending, (state) => {
      //   state.error = undefined
      //   state.isLoading = true
      // })
      // .addCase(fetchEditArticle.rejected, (state, {payload}) => {
      //   state.isLoading = false
      //   state.error = payload
      // })
  },
});

export const {actions: createArticleActions} = createArticleSlice;
export const {reducer: createArticleReducer} = createArticleSlice;
