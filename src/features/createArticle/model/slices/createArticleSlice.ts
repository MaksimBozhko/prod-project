import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ArticleBlockType, ArticleType } from '@/entities/Article';
import { CreateArticleSchema } from '@/features/createArticle';
import {
  ArticleBlock,
  ArticleBlockBase,
  ArticleImageBlock,
  ArticleTextBlock
} from '@/entities/Article/model/types/article';
import { getCurrentDate } from '@/shared/helpers/currentDate';
import { User } from '@/entities/User';

const initialState: CreateArticleSchema = {
  id: '',
  userId: '',
  title: '',
  subtitle: '',
  img: '',
  views: 0,
  createdAt: '',
  type: '' as ArticleType,
  blocks: [],
};

export const createArticleSlice = createSlice({
  name: 'createArticle',
  initialState,
  reducers: {
    setTitle: (state, {payload}: PayloadAction<string>) => {
      state.title = payload
    },
    setSubTitle: (state, {payload}: PayloadAction<string>) => {
      state.subtitle = payload
    },
    setImg: (state, {payload}: PayloadAction<string>) => {
      state.img = payload
    },
    setType: (state, {payload}: PayloadAction<ArticleType>) => {
      state.type = payload
    },
    setNewBlock: (state, {payload}: PayloadAction<ArticleBlockType>) => {
      const id = state.blocks.length.toString()
      switch (payload) {
        case ArticleBlockType.CODE:
          state.blocks.push({id, type: payload, code: ''})
          break;
        case ArticleBlockType.TEXT:
          state.blocks.push({id, type: payload, title: '', paragraphs: ''})
          break;
        case ArticleBlockType.IMAGE:
          state.blocks.push({id, type: payload, title: '', src: ''})
          break;
      }
    },
    updateBlockTitle: (state, {payload}: PayloadAction<{id: number, title: string}>) => {
      const {id, title} = payload
      const block = state.blocks.find((block) => block.id === id.toString())
      if (block && block.type !== ArticleBlockType.CODE) {
        block.title = title
      }
    },
    updateBlockContent: (state, {payload}: PayloadAction<{id: number, content: string}>) => {
      const {id, content} = payload
      const block = state.blocks.find((block) => block.id === id.toString())
      if (block && block.type == ArticleBlockType.TEXT) {
        block.paragraphs = content
      } else if (block && block.type == ArticleBlockType.CODE) {
        block.code = content
      } else if (block && block.type == ArticleBlockType.IMAGE) {
        block.src = content
      }
    },
    setRestInfo: (state, {payload}: PayloadAction<string>) => {
      state.id = '11'
      state.views = 0
      state.createdAt = getCurrentDate()
      state.userId = payload
    },
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
});

export const {actions: createArticleActions} = createArticleSlice;
export const {reducer: createArticleReducer} = createArticleSlice;
